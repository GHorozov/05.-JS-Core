function startApp() {
    showMenuLinks();
    if (sessionStorage.getItem('authToken') === null) {
        showView('welcome-section');
    }else{
       showUserHome();
    }
    attachAllEvents();
}