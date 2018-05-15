function startApp() {
    showMenuLinks();
    if (sessionStorage.getItem('authToken') === null) {
        showView('viewWelcome');
    } else {
        listCatalogPosts();
    }

    attachAllEvents();
}