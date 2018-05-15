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

function showInfo(messgae) {
    let infoBox = $('#infoBox');
    infoBox.text(messgae);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut();
    }, 3000)
}

function showError(error) {
    let errorBox = $('#errorBox');
    errorBox.text(error);
    errorBox.show();
}

function showHomeView() {
    showView('viewWelcome');
}

function showCatalogView() {
    showView('viewCatalog');
}

function showSubmitLink() {
    showView('viewSubmit');
    $('#submitForm').trigger('reset');
}

function showMyPosts() {
    showView('viewMyPosts');
}

function showEditView() {
    showView('viewEdit');
}

function showPostDetails() {
    showView('viewComments');
}
