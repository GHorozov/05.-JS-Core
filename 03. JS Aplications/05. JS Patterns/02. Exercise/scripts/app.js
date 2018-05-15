$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', loadHomePage);

        this.get('#/about', loadAboutPage);

        this.get('#/login', loadLoginPage);
        this.post('#/login', loginUser);

        this.get('#/register', loadRegisterPage);
        this.post('#/register', registerUser);

        this.get('#/logout', logoutUser);

        this.get('#/catalog', loadCatalog);
        this.get('#/catalog/:id', loadTeamDetails);

        this.get('#/create', loadCreatePage);
        this.post('#/create', createTeam);

        this.get('#/leave', loadLeave);

        this.get('#/join/:id', joinTeam);

        this.get('#/edit/:id', loadEdit);
        this.post('#/edit/:id', editTeam);
    });

    app.run();
});

function editTeam(ctx) {
    let teamId = ctx.params.id.substr(1);
    let teamName = ctx.params.name;
    let teamComment =  ctx.params.comment;

    teamsService.edit(teamId, teamName, teamComment).then(function () {
        auth.showInfo(`Team ${teamName} edited!`);
        loadCatalog(ctx);
    });
}

function loadEdit(ctx) {
    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
    ctx.username = sessionStorage.getItem('username');
    ctx.teamId = this.params.id.substr(1);

    teamsService.loadTeamDetails(ctx.teamId).then((data) => {
        ctx.name = data.name;
        ctx.comment = data.comment;

        this.loadPartials({
            header: 'templates/common/header.hbs',
            footer: 'templates/common/footer.hbs',
            editForm: 'templates/edit/editForm.hbs'
        }).then(function () {
            this.partial('templates/edit/editPage.hbs')
        });
    });
}

function joinTeam(ctx) {
    let teamId = ctx.params.id.substr(1);
    teamsService.joinTeam(teamId).then(function (res) {
        auth.saveSession(res);
        auth.showInfo('Team has been joined!');
        loadCatalog(ctx);
    })
}

function loadLeave(ctx) {
    teamsService.leaveTeam().then(function (res) {
        auth.saveSession(res);
        auth.showInfo('Team has been left!');
        loadCatalog(ctx);
    })
}

function createTeam(ctx) {
    let teamName = ctx.params.name;
    let comment = ctx.params.comment;

    teamsService.createTeam(teamName, comment).then(function (data) {
        teamsService.joinTeam(data._id).then(function (newData) {
            console.log(newData);
            auth.saveSession(newData);
            auth.showInfo('New Team has been created!');
            loadCatalog(ctx);
        })
    });
}

function loadCreatePage(ctx) {
    this.loggedIn = sessionStorage.getItem('authtoken') !== null;
    this.username = sessionStorage.getItem('username');
    this.loadPartials({
        header: 'templates/common/header.hbs',
        footer: 'templates/common/footer.hbs',
        createForm: './templates/create/createForm.hbs'
    }).then(function () {
        this.partial('./templates/create/createPage.hbs');
    });
}

function loadTeamDetails(ctx) {
    let id = ctx.params.id.substr(1);
    teamsService.loadTeamDetails(id).then(function (details) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.name = details.name;
        ctx.comment = details.comment;
        ctx.teamId = details._id;
        ctx.members = details.members;
        ctx.teamId = details._id;
        ctx.isOnTeam = details._id === sessionStorage.getItem('teamId');
        ctx.isAuthor = details._acl.creator === sessionStorage.getItem('userId');

        ctx.loadPartials({
            header: 'templates/common/header.hbs',
            footer: 'templates/common/footer.hbs',
            team: 'templates/catalog/team.hbs',
            teamMember: 'templates/catalog/teamMember.hbs',
            teamControls: 'templates/catalog/teamControls.hbs'
        }).then(function () {
            this.partial('templates/catalog/details.hbs');
        });
    }).catch(auth.handleError);
}


function loadCatalog(ctx) {
    teamsService.loadTeams().then(function (data) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.hasTeam = sessionStorage.getItem('teamId') !== null;
        ctx.hasNoTeam = sessionStorage.getItem('teamId') === null
            || sessionStorage.getItem('teamId') === "undefined";
        ctx.teams = data;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            team: './templates/catalog/team.hbs'
        }).then(function () {
            this.partial('./templates/catalog/teamCatalog.hbs');
        });
    });
}

function logoutUser(ctx) {
    auth.logout().then(function () {
        auth.showInfo('Logout successfully!');
        sessionStorage.clear();
        loadHomePage(ctx);
    }).catch(auth.handleError);
}

function loginUser(ctx) {
    auth.login(ctx.params.username, ctx.params.password).then(function (data) {
        auth.showInfo('Login successfully!');
        auth.saveSession(data);
        loadHomePage(ctx);
    }).catch(auth.handleError);
}

function registerUser(ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    let repeatPassword = ctx.params.repeatPassword;

    if (password === repeatPassword) {
        auth.register(username, password).then(function (userData) {
            auth.showInfo('You have registered successfully!');
            auth.saveSession(userData);
            loadHomePage(ctx);
        }).catch(auth.handleError);
    } else {
        auth.showError('Password do not match!')
    }
}

function loadHomePage(ctx) {
    ctx.loggedIn = auth.isAuthenticated();
    ctx.username = auth.getUsername();
    ctx.hasTeam = sessionStorage.getItem('teamId') !== undefined;
    ctx.loadPartials({
        header: 'templates/common/header.hbs',
        footer: 'templates/common/footer.hbs'
    }).then(function () {
        this.partial('templates/home/home.hbs')
    })
}

function loadAboutPage(ctx) {
    this.loggedIn = sessionStorage.getItem('authtoken') !== null;
    this.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: 'templates/common/header.hbs',
        footer: 'templates/common/footer.hbs',
    }).then(function () {
        this.partial('templates/about/about.hbs')
    })
}

function loadLoginPage(ctx) {
    ctx.loadPartials({
        header: 'templates/common/header.hbs',
        footer: 'templates/common/footer.hbs',
        loginForm: 'templates/login/loginForm.hbs'
    }).then(function () {
        this.partial('templates/login/loginPage.hbs');
    })
}

function loadRegisterPage(ctx) {
    ctx.loadPartials({
        header: 'templates/common/header.hbs',
        footer: 'templates/common/footer.hbs',
        registerForm: 'templates/register/registerForm.hbs'
    }).then(function () {
        this.partial('templates/register/registerPage.hbs');
    })
}
