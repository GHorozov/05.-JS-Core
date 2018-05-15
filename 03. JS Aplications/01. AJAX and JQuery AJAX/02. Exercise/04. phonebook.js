function attachEvents() {
    const URL = 'https://phonebook-nakov.firebaseio.com/phonebook';
    $('#btnLoad').on('click', loadData);
    $('#btnCreate').on('click', postData);


    function loadData() {
        $('#phonebook').empty();
        $.get(URL + '.json')
            .then(getPhonebook)
            .catch(displayError);
    }

    function getPhonebook(data) {
        for (let key in data) {
            if (data[key] === null) {
                continue;
            }
            let person = data[key]['person'];
            let phone = data[key]['phone'];

            makeLi(person, phone, key);
        }
    }

    function postData() {
        let person = $('#person').val();
        let phone = $('#phone').val();
        let postElementData = JSON.stringify({person, phone});

        $.ajax({
            method: 'POST',
            url: URL + '.json',
            data: postElementData,
            success: appendElement,
            error: displayError
        });

        function appendElement(response) {
            makeLi(person, phone, response.person);
        }

        $('#person').val('');
        $('#phone').val('');
    }


    function makeLi(person, phone, key) {
        let li = $(`<li>${person}: ${phone}</li> `)
            .append($(`<button>`).text('[DELETE]')).on('click', function () {
                $.ajax({
                    method: 'DELETE',
                    url: URL + '/' + key + '.json',
                }).then(() => {
                    $(li).remove()
                })
            });

        $('#phonebook').append(li);
    }

    function displayError(err) {
        $('#phonebook').append($('<li>').text("Error"));
    }

}
