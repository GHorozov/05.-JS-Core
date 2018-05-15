(function solution() {
    const username = 'guest';
    const password = 'guest';
    const authHeaders = 'Basic ' + btoa(username + ":" + password);
    const URL = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e';
    const headers = {
        'Content-type': 'application/json',
        'Authorization': authHeaders
    };

    let message = 'Knock Knock.';


    //This is another way to login
    //------------------------------------------------
    // login();
    //
    // function login() {
    //     let credentials = {
    //         username: kinveyUsername,
    //         password: kinveyPassword
    //     };
    //
    //     $.ajax({
    //         method: 'POST',
    //         url: baseUrl + '/login',
    //         headers: authHeader,
    //         data: JSON.stringify(credentials)
    //     });
    // }
    //---------------------------------------------------


    $('#btnLoad').on('click', function () {
        $.ajax({
            method: 'GET',
            url: URL + `/knock?query=${message}`,
            headers: headers,
            success: displayAnswer
        });

        function displayAnswer(res) {
           message = res.message;
           let answer = res.answer;

           $('#messages').append($(`<li>Message: ${message}, Answer: ${answer}</li>`));
        }
    });
})();


