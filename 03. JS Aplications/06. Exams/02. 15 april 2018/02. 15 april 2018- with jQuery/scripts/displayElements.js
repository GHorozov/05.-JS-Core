function showView(viewName) {
    $('#container section').hide();
    $('#' + viewName).show();
}

function showMenuLinks() {
    if(sessionStorage.getItem('authToken') === null){
        $('#profile').hide();
        $('#menu').hide();
    }else{
        $('#profile').show();
        $('#menu').show();
        $('#profile > span').text(`${sessionStorage.getItem('username')}`);
    }
}

function showInfo(messgae) { //to check infoBox id
    let infoBox = $('#infoBox');
    infoBox.text(messgae);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut();
    }, 3000)
}

function showError(error) { //to check errorBox id
    let errorBox = $('#errorBox');
    errorBox.text(error);
    errorBox.show();
}

function showHomeView() { //to change
    showView('create-receipt-view');
}

function showLoginView() {

}

function showRegisterView() {

}

function showUserHome() {
    showView('create-receipt-view');
}

function showReceiptView() {
    showView('create-receipt-view');
}


// $('#editPostForm').trigger('reset'); //-->can use to reset form

