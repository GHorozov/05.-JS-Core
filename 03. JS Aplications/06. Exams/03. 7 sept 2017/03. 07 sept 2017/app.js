$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', (ctx) => {
            if (auth.isAuth()) {
                loadHome(ctx);
            } else {
                loadWelcomePage(ctx);
            }
        });

        this.get('#/login', loadWelcomePage);

        this.get('#/register', loadRegisterPage);

        this.post("#/register", function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repPassword = ctx.params.repeatPass;

            if (username.length < 5) {
                notify.showError("Username shouldn`t be less than 5 characters!")
            } else if (password === '') {
                notify.showError("Password shouldn`t be empty!")
            } else if (password !== repPassword) {
                notify.showError("Passwords mismatch!")
            } else {
                auth.register(username, password)
                    .then((user) => {
                        console.log(user);
                        auth.saveSession(user);
                        sessionStorage.setItem('subscriptions', user.subscriptions);
                        notify.showInfo("User registration successful.");
                        ctx.redirect("#/home");
                    })
                    .catch(notify.handleError);
            }
        });

        this.post("#/login", function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            if (username.length < 5) {
                notify.showError("Username shouldn`t be less than 5 characters!")
            } else if (password === '') {
                notify.showError("Password shouldn`t be empty!")
            } else {
                auth.login(username, password)
                    .then((user) => {
                        auth.saveSession(user);
                        sessionStorage.setItem('subscriptions', user.subscriptions);
                        notify.showInfo("Login successful.");
                        ctx.redirect("#/home");
                    })
                    .catch(notify.handleError);
            }
        });

        this.get("#/logout", function (ctx) {
            auth.logout()
                .then((res) => {
                    sessionStorage.clear();
                    notify.showInfo("Logout successful.");
                    ctx.redirect("#/welcome");
                }).catch(notify.handleError);
        });

        this.get("#/home", loadHome);

        this.post('#/submitChirp', (ctx) => {
            let text = ctx.params.text;

            if (text.length === 0) {
                notify.showError('Chirp should not be empty.');
            } else if (text.length > 150) {
                notify.showError('Chirp should not be more than 150 symbols.');
            } else {
                chirpsService.createChirp(text).then((res) => {
                    notify.showInfo('Chirp published.');
                    ctx.redirect('#/me');
                }).catch(notify.handleError);
            }
        });

        this.get('#/me', (ctx) => {
            ctx.name = sessionStorage.getItem('username');

            chirpsService.getMyChirps().then((res) => {
                let chirps = 0;
                let following = 0;
                let followers = 0;
                res.map(x => {
                    x.time = calcTime(x._kmd.ect);
                });
                ctx.chirps = res.length;
                chirpsService.getFollowing().then((resp) => {
                    following = resp[0].subscriptions.length;
                });
                ctx.following = following;
                chirpsService.getFollowers().then((resp) => {
                    followers = resp.length;
                });
                ctx.followers = followers;

                ctx.articles = res;
                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    navigation: 'templates/common/navigation.hbs',
                    footer: 'templates/common/footer.hbs',
                    article: 'templates/views/viewMe/article.hbs'
                }).then(function () {
                    this.partial('templates/views/viewMe/viewMe.hbs');
                })
            }).catch(notify.handleError);
        });

        this.get('#/me/:id/delete', (ctx) => {
            let id = ctx.params.id;

            chirpsService.deleteChirp(id).then((res) => {
                notify.showInfo('Chirp deleted.');
                ctx.redirect('#/me');
            }).catch(notify.handleError);
        });

        this.get('#/discover', (ctx) => {
            chirpsService.getDiscover().then((res) => {
                let followers = 0;

                res.forEach(x => {
                    x.author = x.username;
                    x.followers = x.subscriptions.length;
                });

                //ctx.followers = followers;

                ctx.users = res;

                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    navigation: 'templates/common/navigation.hbs',
                    footer: 'templates/common/footer.hbs',
                    user: 'templates/views/viewDiscover/user.hbs'
                }).then(function () {
                    this.partial('templates/views/viewDiscover/viewDiscover.hbs');
                })
            }).catch(notify.handleError);
        });

        this.get('#/me/:author', (ctx) => {
            let username = ctx.params.author;
            console.log(username);

            chirpsService.followUser(username).then((res) => {
                console.log(res);
            }).catch(notify.handleError);
        });


    });

    //---------------------------------
    app.run();
});

function loadHome(ctx) {
    chirpsService.getChirps().then((res) => {
        let chirps = 0;
        let following = 0;
        let followers = 0;

        ctx.name = sessionStorage.getItem('username');
        res.map(x => {
            if (x.author === sessionStorage.getItem('username')) {
                chirps++;
            }
            x.time = calcTime(x._kmd.ect);
        });

        ctx.chirps = chirps;
        chirpsService.getFollowing().then((resp) => {
            following = resp[0].subscriptions.length;
        }).catch(notify.handleError);
        ctx.following = following;

        chirpsService.getFollowers().then((resp) => {
            followers = resp.length;
        });
        ctx.followers = followers;

        ctx.articles = res;

        getViewFeed(ctx);
    }).catch(notify.handleError);
};


function getViewFeed(ctx) {
    ctx.loadPartials({
        header: 'templates/common/header.hbs',
        navigation: 'templates/common/navigation.hbs',
        footer: 'templates/common/footer.hbs',
        submitChirpForm: 'templates/views/viewFeed/submitChirpForm.hbs',
        article: 'templates/views/viewFeed/article.hbs'
    }).then(function () {
        this.partial('templates/views/viewFeed/viewFeed.hbs');
    })
}

function loadRegisterPage(ctx) {
    ctx.loadPartials({
        header: 'templates/common/header.hbs',
        footer: 'templates/common/footer.hbs',
        registerForm: 'templates/welcome/registerForm.hbs',
        welcome: 'templates/welcome/welcome.hbs'
    }).then(function () {
        this.partial('templates/welcome/register.hbs');
    })
}

function loadWelcomePage(ctx) {
    ctx.loadPartials({
        header: 'templates/common/header.hbs',
        footer: 'templates/common/footer.hbs',
        loginForm: 'templates/welcome/loginForm.hbs',
        register: 'templates/welcome/register.hbs'
    }).then(function () {
        this.partial('templates/welcome/welcome.hbs');
    })
}

function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}

