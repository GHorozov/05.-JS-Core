function showView(viewName) {
    $('main > section').hide();
    $('#' + viewName).show();
}

async function showHideMenuLinks() {
    let authToken = sessionStorage.getItem('authToken');
    let headers = window.headers.unAuthHeaders;
    if (authToken) {
        headers = window.headers.authHeaders;
    }
    let source = await $.get('templates/headers-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({
        headers
    });

    $('#app').empty();
    $('#app').append(template);

    attachNavigationLinks()
}

function attachNavigationLinks() {
    //attach navigation menu links
    $("#linkHome").on('click', showHomeView);
    $("#linkLogin").on('click', showLoginView);
    $("#linkRegister").on('click', showRegisterView);
    $("#linkListAds").on('click', listAds);
    $("#linkCreateAd").on('click', showCreateAdView);
    $("#linkLogout").on('click', logoutUser);
}

async function showInfo(message) {
    let infoSource = await $.get('templates/infoBox-template.hbs');
    let infoCompiled = Handlebars.compile(infoSource);
    let infoTemplate = infoCompiled({});
    $('#msg').append(infoTemplate);

    $("#msg").on('click', function() {
        $(this).fadeOut()
    });

    let infoBox = $('#infoBox');
    infoBox.text(message);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut();
    }, 3000)

}

async function showError(errorMsg) {
    let errorSource = await $.get('templates/errorBox-template.hbs');
    let errorCompiled = Handlebars.compile(errorSource);
    let errorTemplate = errorCompiled({});
    $('#app').append(errorTemplate);

    $("#errorBox").on('click', function() {
        $(this).fadeOut()
    });

    let errorBox = $('#errorBox');
    errorBox.text("Error: " + errorMsg);
    errorBox.show();
    showHomeView();
}

async function showHomeView() {
    let source = await $.get('templates/home-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({});
    $('#main').empty();
    $('#main').append(template);
}

async function showLoginView() {

    let chechLoginOrRegister = true;
    let source = await $.get('templates/register-login-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({
        chechLoginOrRegister
    });

    $('#main').empty();
    $('#main').append(template);
    $("#buttonLoginUser").on('click', loginUser);

}

async function showRegisterView() {
    let chechLoginOrRegister = false;
    let source = await $.get('templates/register-login-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({
        chechLoginOrRegister
    });
    $('#main').empty();
    $('#main').append(template);
    $("#buttonRegisterUser").on('click', registerUser);
}

async function showCreateAdView() {
    let checkCreateEdit = true;
    let source = await $.get('templates/create-edit-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({
        checkCreateEdit
    });
    $('#main').empty();
    $('#main').append(template);
    $("#buttonCreateAd").on('click', createAd);
}

async function showEditAdView(id, title, description, date, price, urlPicture, views) {
    let checkCreateEdit = false;
    let source = await $.get('templates/create-edit-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({
        checkCreateEdit,
        id,
        title,
        description,
        date,
        price,
        urlPicture,
        views
    });

    $('#main').empty();
    $('#main').append(template);
    $("#buttonEditAd").on('click', editAd);
}

async function showSingleAdView(ad) {
    let title = ad.title;
    let description = ad.description;
    let date= ad.date;
    let price = ad.price;
    let views = ad.views;

    let source = await $.get('templates/singleAd-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({
        title,
        description,
        date,
        price,
        views
    });
    $('#main').empty();
    $('#main').append(template);
}

async function showAdsView(ads) {
    ads.forEach(el => {
        if (sessionStorage.getItem('userId') === el._acl.creator) {
            el.isAuthor = true;
        }
    });
    ads.map(el => Number(el.price).toFixed(2));
    let source = await $.get('templates/viewAds-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({
        ads: ads
    });

    $('#main').empty();
    $('#main').append(template);
    $('.btnReadMore').on('click', function (e){
        let ad ={
            _id: $(this).parent().parent().data().id,
            title: $(this).parent().parent()[0].cells[0].textContent,
            description: $(this).parent().parent()[0].cells[2].textContent,
            publisher: $(this).parent().parent()[0].cells[1].textContent,
            date: $(this).parent().parent()[0].cells[4].textContent,
            price: $(this).parent().parent()[0].cells[3].textContent,
            pictureUrl: $(this).parent().parent()[0].cells[6].textContent,
            views: $(this).parent().parent()[0].cells[5].textContent
        };
        loadReadMore(ad);
    });
    $('.btnEdit').on('click', function(e){
        let ad ={
            _id: $(this).parent().parent().data().id,
            title: $(this).parent().parent()[0].cells[0].textContent,
            description: $(this).parent().parent()[0].cells[2].textContent,
            publisher: $(this).parent().parent()[0].cells[1].textContent,
            date: $(this).parent().parent()[0].cells[4].textContent,
            price: $(this).parent().parent()[0].cells[3].textContent,
            pictureUrl: $(this).parent().parent()[0].cells[6].textContent,
            views: $(this).parent().parent()[0].cells[5].textContent
        };
        loadAdForEdit(ad);
    });
    $('.btnDelete').on('click', function (e){
        let ad ={
            _id: $(this).parent().parent().data().id,
            title: $(this).parent().parent()[0].cells[0].textContent,
            description: $(this).parent().parent()[0].cells[2].textContent,
            publisher: $(this).parent().parent()[0].cells[1].textContent,
            date: $(this).parent().parent()[0].cells[4].textContent,
            price: $(this).parent().parent()[0].cells[3].textContent,
            pictureUrl: $(this).parent().parent()[0].cells[6].textContent,
            views: $(this).parent().parent()[0].cells[5].textContent
        };
        deleteAd(ad);
    });
}


async function showLoadingView() {
    let source = await $.get('templates/loading-template.hbs');
    let compiled = Handlebars.compile(source);
    let template = compiled({});
    $('#main').empty();
    $('#main').append(template);

    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    })
}



