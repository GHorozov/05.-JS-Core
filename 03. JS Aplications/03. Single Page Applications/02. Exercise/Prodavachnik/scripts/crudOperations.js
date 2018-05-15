const BaseUrl = 'https://baas.kinvey.com/';
const AppKey = 'kid_HyKhYl-jf';
const AppSecret = '90c878cc71b24ccdad7a2e49eeff069f';
const AuthHeaders = {'Authorization': "Basic " + btoa(AppKey + ":" + AppSecret)};
const AdsPerPage = 10;

function loginUser() {
    let username = $('#formLogin input[name=username]').val();
    let password = $('#formLogin input[name=passwd]').val();
    $.ajax({
        method: 'POST',
        url: BaseUrl + 'user/' + AppKey + '/login',
        data: {username, password},
        headers: AuthHeaders
    }).then(function (res) {
        signInUser(res, 'Login successful');
    }).catch(handleAjaxError);
}

function signInUser(res, message) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authToken', res._kmd.authtoken);
    sessionStorage.setItem('userId', res._id);
    showHomeView();
    showHideMenuLinks();
    showInfo(message);
}

function registerUser() {
    let username = $('#formRegister input[name=username]').val();
    let password = $('#formRegister input[name=passwd]').val();
    $.ajax({
        method: 'POST',
        url: BaseUrl + 'user/' + AppKey + '/',
        headers: AuthHeaders,
        data: {username, password}
    }).then(function (res) {
        signInUser(res, 'Registration successful.');
    }).catch(handleAjaxError);
}

function createAd() {
    let title = $('#formCreateAd input[name=title]').val();
    let description = $('#formCreateAd textarea[name=description]').val();
    let publisher = sessionStorage.getItem('username');
    let date = $('#formCreateAd input[name=datePublished]').val();
    let price = parseFloat($('#formCreateAd input[name=price]').val()).toFixed(2);
    let pictureUrl = $('#formCreateAd input[name=urlPicture]').val();
    let views = 0;
    $.ajax({
        method: 'POST',
        url: BaseUrl + 'appdata/' + AppKey + '/Ads',
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {title, description, publisher, date, price, pictureUrl, views}
    }).then(function (res) {
        $('#formCreateAd').trigger('reset');
        listAds();
        showInfo('Ad created.')
    }).catch(handleAjaxError);
}

function listAds() {
    $.ajax({
        method: 'GET',
        url: BaseUrl + 'appdata/' + AppKey + '/Ads',
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        showView('viewAds');
        let result = res.sort((a,b) => b.views - a.views);
        displayPaginationAndAds(result);
        //displayPaginationAndAds(res.reverse());
    }).catch(handleAjaxError);
}

function loadReadMore(ad) {
    let id = ad._id;
    if (!(ad.publisher === sessionStorage.getItem('username'))) {
        let title = ad.title;
        let description = ad.description;
        let publisher = ad.publisher;
        let date = ad.date;
        let price = ad.price;
        let pictureUrl = ad.pictureUrl;
        let views = Number(ad.views);
        views++;
        $.ajax({
            method: 'PUT',
            url: BaseUrl + 'appdata/' + AppKey + '/Ads/' + id,
            headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {title, description, publisher,date, price, pictureUrl, views}
        }).catch(handleAjaxError);
    }

    $('#contentPicture').text('');
    $('#contentTitle').text('');
    $('#contentDescription').text('');
    $('#contentDatePublished').text('');
    $('#contentPrice').text('');
    $('#contentViews').text('');

    showView('viewSingleAd');
    let img = $("<img />").attr('src', `${ad.pictureUrl}`)
        .on('load', function () {
            if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
                alert('broken image!');
            } else {
                img.width = 200;
                $("#contentPicture").append(img);
            }
        });

    $('#contentTitle').append(`Title: ${ad.title}`);
    $('#contentDescription').append(`Description: ${ad.description}`);
    $('#contentDatePublished').append(`Date Published: ${ad.date}`);
    $('#contentPrice').append(`Price: ${ad.price}`);
    $('#contentViews').append(`Views: ${ad.views}`);
}

function loadAdForEdit(ad) {
    showView('viewEditAd');
    $('#formEditAd input[name=id]').val(ad._id);
    $('#formEditAd input[name=title]').val(ad.title);
    $('#formEditAd textarea[name=description]').val(ad.description);
    $('#formEditAd input[name=datePublished]').val(ad.date);
    $('#formEditAd input[name=price]').val(ad.price);
    $('#formEditAd input[name=urlPicture]').val(ad.pictureUrl);
    $('#formEditAd input[name=views]').val(ad.views);
}

function editAd(ad) {
    let id = $('#formEditAd input[name=id]').val();
    let title = $('#formEditAd input[name=title]').val();
    let description = $('#formEditAd textarea[name=description]').val();
    let publisher = sessionStorage.getItem('username');
    let date = $('#formEditAd input[name=datePublished]').val();
    let price = $('#formEditAd input[name=price]').val();
    let pictureUrl = $('#formEditAd input[name=urlPicture]').val();
    let views =  $('#formEditAd input[name=views]').val();

    $.ajax({
        method: 'PUT',
        url: BaseUrl + 'appdata/' + AppKey + '/Ads/' + id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {title, description, publisher, date, price, pictureUrl, views}
    }).then(function (res) {
        listAds();
        showView('viewAds');
        showInfo('Ad edited.');
    }).catch(handleAjaxError);
}

function deleteAd(ad) {
    $.ajax({
        method: 'DELETE',
        url: BaseUrl + 'appdata/' + AppKey + '/Ads/' + ad._id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function () {
        listAds();
        showInfo('Ad deleted.')
    }).catch(handleAjaxError)
}

function logoutUser() {
    sessionStorage.clear();
    showHomeView();
    showHideMenuLinks();
    showInfo('Logout successful.');
}

function displayPaginationAndAds(ads) {
    let pagination = $('#pagination-demo');
    if (pagination.data("twbs-pagination")) {
        pagination.twbsPagination('destroy')
    }
    pagination.twbsPagination({
        totalPages: Math.ceil(ads.length / AdsPerPage),
        visiblePages: 5,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            let table = $('#ads > table');
            table.find('tr').each((index, el) => {
                if (index > 0) {
                    $(el).remove()
                }
            });
            let startAd = (page - 1) * AdsPerPage;
            let endAd = Math.min(startAd + AdsPerPage, ads.length);
            $(`a:contains(${page})`).addClass('active');
            for (let i = startAd; i < endAd; i++) {
                let tr = $(`<tr>`);
                table.append(
                    $(tr).append($(`<td>${ads[i].title}</td>`))
                        .append($(`<td>${ads[i].publisher}</td>`))
                        .append($(`<td>${ads[i].description}</td>`))
                        .append($(`<td>${ads[i].price}</td>`))
                        .append($(`<td>${ads[i].date}</td>`))
                        .append($(`<td>${ads[i].views}</td>`))
                );

                $(tr).append($(`<td>`)
                    .append(
                        $(`<a href="#">[ReadMore]</a>`).on('click', function () {
                            loadReadMore(ads[i])
                        })
                    ));

                if (ads[i]._acl.creator === sessionStorage.getItem('userId')) {
                    $(tr).append(
                        $(`<td>`)
                            .append(
                                $(`<a href="#">[Edit]</a>`).on('click', function () {
                                    loadAdForEdit(ads[i])
                                })
                            )
                            .append(
                                $(`<a href="#">[Delete]</a>`).on('click', function () {
                                    deleteAd(ads[i])
                                })
                            )
                    )
                }
            }
        }
    })
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showError(errorMsg);
}