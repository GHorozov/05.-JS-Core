function createReceipt() {
    $.ajax({
        method: 'POST',
        url: BaseUrl + 'appdata/' + AppKey + `/receipts`,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {
            "active": true,
            "productCount": 0,
            "total": 0
        }
    }).then(function (res) {
        console.log(res);
    }).catch(handleAjaxError);
}

function displayActiveReceipt() {
    let userId = sessionStorage.getItem('userId');
    //'https://baas.kinvey.com/appdata/app_key/receipts?query={"_acl.creator":"userId","active": "true"}'
        //

    $.ajax({
        method: 'GET',
        url: BaseUrl + 'appdata/' + AppKey + `/receipts?query={"_acl.creator":"${userId}","active": "true"}`,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
    }).then(function (res) {
        if(res.length > 0){
            displayAll(res);
        }else{
            createReceipt();
        }
    }).catch(handleAjaxError);

    function displayAll(res){
        showReceiptView();
        let receiptContainer = $('create-receipt-view');
        receiptContainer.empty();

        let id = res._id;
        console.log(id);

        $.ajax({
            method: 'GET',
            url: BaseUrl + 'appdata/' + AppKey + `/entries?query={"receiptId":"${id}"}`,
            headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            console.log(res);
            formDisp(res);
        }).catch(handleAjaxError);

        async function formDisp(res){

            async function f() {
                let id = res._id;
                let sub = res.forEach(x => x.sub = x.price * x.qty);
                let entries = {
                    type: res.type,
                    price: res.price,
                    qty: res.qty,
                    sub: sub
                };


                let source = await $.get('./templates/createReceipt-template.hbs');
                let compile = Handlebars.compile(source);
                let template = compile({
                    data: res
                });

                $('#viewComments').append(template);
                attachEvents();
            }
            await f();

            function attachEvents() {
                $('#deleteLink').on('click', deleteBtnAction);
                $('#addItemBtn').on('click', addBtnAction);
                $('#checkoutBtn').on('click', checkoutBtnAction);
            }
        }
    }
}

function deleteBtnAction() {
    event.preventDefault();
    let id = $(this).parent().parent().data().id; //
    let postId = $('#viewComments .post').data().id; //

    $.ajax({
        method: 'DELETE',
        url: BaseUrl + 'appdata/' + AppKey + '/...../' + id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
    }).then(async function () {
        await loadPostDetails(postId);
        showInfo('Comment deleted.')
    }).catch(handleAjaxError);
}

function addBtnAction() {
    console.log(this);
}

function checkoutBtnAction() {
    console.log(this);
}

function displayAllReceipt() {
    
}









function handleAjaxError(err) {
    let errorMsg = JSON.stringify(err);
    if (err.readyState === 0) {
        errorMsg = "Cannot connect due to network error.";
    }
    if (err.responseJSON && err.responseJSON.description) {
        errorMsg = err.responseJSON.description;
    }
    showError(errorMsg);
}