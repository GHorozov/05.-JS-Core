const BaseUrl = 'https://baas.kinvey.com/';
const AppKey = 'kid_SycNNCehM';
const AppSecret = 'aede84ff95ba4fa39dcead651ae2b0d1';
const AuthHeaders = {'Authorization': "Basic " + btoa(AppKey + ":" + AppSecret)};

function registerUser(event) {
    event.preventDefault();
    let username = $('#register-form input[name=username-register]').val();
    let password = $('#register-form input[name=password-register]').val();
    let repeatPassword = $('#register-form input[name=password-register-check]').val();

    // console.log(username);
    // console.log(password);
    // console.log(repeatPassword);

    let nameRegex = /[A-Za-z0-9]{5,}/;

    if(!username.match(nameRegex) || password.length === 0 || password !== repeatPassword){
        showError('Incorect username/password.Try again.')
    }else {
        $.ajax({
            method: 'POST',
            url: BaseUrl + 'user/' + AppKey + '/',
            headers: AuthHeaders,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'User registration successful.');
        }).catch(handleAjaxError);
    }

    $('#register-form input[name=username-register]').val('');
    $('#register-form input[name=password-register]').val('');
    $('#register-form input[name=password-register-check]').val('');
}

function loginUser(event) {
    event.preventDefault();
    let username = $('#login-form input[name=username-login]').val();
    let password = $('#login-form input[name=password-login]').val();

    let nameRegex = /[A-Za-z0-9]{5,}/;

    if(!username.match(nameRegex) || password.length === 0){
        showError('Incorect username/password.Try again.')
    }else {

        $.ajax({
            method: 'POST',
            url: BaseUrl + 'user/' + AppKey + '/login',
            data: {username, password},
            headers: AuthHeaders
        }).then(function (res) {
            signInUser(res, 'Login successful');
        }).catch(handleAjaxError);
    }

    $('#login-form input[name=username-login]').val('');
    $('#login-form input[name=password-login]').val('');
}

function logoutUser() {
    sessionStorage.clear();
    showMenuLinks();
    showHomeView();
    showInfo('Logout successful.')
}

function signInUser(res, msg) {
    sessionStorage.setItem('authToken', res._kmd.authtoken);
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('userId', res._id);

    showUserHome();
    showMenuLinks();
    showInfo(msg);
}