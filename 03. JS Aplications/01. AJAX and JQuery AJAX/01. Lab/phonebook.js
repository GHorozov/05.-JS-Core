$('#btnLoad').on('click', loadData);
$('#btnCreate').on('click', postData);

const URL = "https://phonebook-7dcfd.firebaseio.com/phonebook";

function loadData() {
    $('#phonebook').empty();
    $.ajax({
        method: "GET",
        url: URL + '.json',
        success: displayData,
        error: displayError
    });

    function displayData(response) {
        for (let key in response) {
            if (response[key] === null) {
                continue;
            }
            generateLi(response[key].name, response[key].phone, key )
        }
    }
}

function postData() {
    let name = $('#person').val();
    let phone = $('#phone').val();
    let postElementData = JSON.stringify({name, phone});
    $.ajax({
        method: 'POST',
        url: URL + '.json',
        data: postElementData,
        success: appendElement,
        error: displayError
    });

    function appendElement(response) {
        generateLi(name, phone, response.name);
    }

    $('#person').val('');
    $('#phone').val('');
}

function generateLi(name, phone, key) {
    let li =  $(`<li>${name}: ${phone}</li> `)
        .append($(`<a href="#">[DELETE]</a>`)).on('click', function(){
            $.ajax({
                method: 'DELETE',
                url: URL + '/' + key + '.json',
            }).then(() => {$(li).remove()}) //remove all row
                .catch(displayError)
        });

    $('#phonebook').append(li);
}

function displayError(error) {
    console.log(error);
}