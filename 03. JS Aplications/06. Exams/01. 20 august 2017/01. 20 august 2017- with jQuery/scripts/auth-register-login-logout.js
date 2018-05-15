const BaseUrl = 'https://baas.kinvey.com/';
const AppKey = 'kid_SyXS8QRoG';
const AppSecret = '2a9d98236b6f458aa8ce1c39b3179a36';
const AuthHeaders = {'Authorization': "Basic " + btoa(AppKey + ":" + AppSecret)};

function registerUser(event) { //to add
    event.preventDefault();
    let username = $('#registerForm input[name=username]').val();
    let password = $('#registerForm input[name=password]').val();
    let repeatPassword = $('#registerForm input[name=repeatPass]').val();

    let nameRegex = /[A-Za-z]{3,}/;
    let passRegex = /[A-Za-z0-9]{6,}/;

    if(!username.match(nameRegex) || !password.match(passRegex)|| password !== repeatPassword){
        showError('invalid username/password');
    }else {
        $.ajax({
            method: 'POST',
            url: BaseUrl + 'user/' + AppKey + '/',
            headers: AuthHeaders,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'User registration successful.');
            $('#registerForm input[name=username]').val('');
            $('#registerForm input[name=password]').val('');
            $('#registerForm input[name=repeatPass]').val('');
        }).catch(handleAjaxError);
    }
}

function loginUser(event) { //to add
    event.preventDefault();
    let username = $('#loginForm input[name=username]').val();
    let password = $('#loginForm input[name=password]').val();
    $.ajax({
        method: 'POST',
        url: BaseUrl + 'user/' + AppKey + '/login',
        data: {username, password},
        headers: AuthHeaders
    }).then(function (res) {
        signInUser(res, 'Login successful');
        let username = $('#loginForm input[name=username]').val('');
        let password = $('#loginForm input[name=password]').val('');
    }).catch(handleAjaxError);
}

function logoutUser() {
    sessionStorage.clear();
    showMenuLinks();
    showHomeView();
    showInfo('Logout successful.')
}

function signInUser(res, msg) { //to check res
    sessionStorage.setItem('authToken', res._kmd.authtoken);
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('userId', res._id);

    showCatalogView();
    showMenuLinks();
    showInfo(msg);
}