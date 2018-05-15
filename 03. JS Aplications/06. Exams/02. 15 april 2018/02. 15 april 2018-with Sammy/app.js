$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get("index.html", loadHomeScreen);
        this.get("#/home", loadHomeScreen);

        this.get('#/welcome', loadWelcome);
        this.post('#/register', registerUser);
        this.post('#/login', loginUser);
        this.get('#/logout', logoutUser);

        this.get('#/receipt', (ctx) => {
            ctx.name = sessionStorage.getItem('username');
            receiptService.getActive().then((res) => {
                let total = 0;
                let count = 0;

                if (res.length === 0) {
                    receiptService.createReceipt().then(function (response) {
                        ctx.total = total;
                        ctx.entriesCount = count;
                        ctx.receiptId = response._id;

                        loadReceiptEditorView(ctx);
                    }).catch(notify.handleError);
                } else {
                    let receiptId = res[0]._id;
                    sessionStorage.setItem('receiptId', receiptId);
                    receiptService.getEntries(receiptId).then((entries) => {
                        entries.forEach(e => {
                            e.subTotal = Number(e.qty) * Number(e.price).toFixed(2);
                            total += Number(e.subTotal);
                            count++;
                        });

                        ctx.total = total;
                        ctx.rows = entries;
                        ctx.entriesCount = count;
                        ctx.receiptId = receiptId;

                        loadReceiptEditorView(ctx);
                    }).catch(notify.handleError);
                }
            }).catch(notify.handleError);
        });

        this.post('#/createEntry', (ctx) => {
            let type = ctx.params.type;
            let qty = Number(ctx.params.qty);
            let price = Number(ctx.params.price);

            let receiptId = sessionStorage.getItem('receiptId');

            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }


            if (type === '' || type === null || isNumber(type)) {
                notify.showError('Name cannot be empty string or number.');
            } else if (!isNumber(qty) || qty === 0 || qty === null || qty === undefined) {
                notify.showError('Quantity must be number.');
            } else if (!isNumber(price) || price === 0 || price === null || price === undefined) {
                notify.showError('Price must be number');
            } else {
                receiptService.addProduct(type, Number(qty), Number(price), receiptId).then((res) => {
                    notify.showInfo('Entry added');
                    ctx.redirect("#/receipt");
                }).catch(notify.handleError);
            }
        });

        this.get('#/row/:id/delete', (ctx) => {
            let productId = ctx.params.id;
            receiptService.deleteProduct(productId).then((res) => {
                notify.showInfo('Entry removed');
                ctx.redirect('#/receipt');
            }).catch(notify.handleError);
        });

        this.post('#/checkoutReceipt', (ctx) => {
            let receiptId = ctx.params.receiptId;
            let productCount = ctx.params.productCount;
            let total = ctx.params.total;

            if (productCount > 0) {
                receiptService.checkoutReceipt(receiptId, productCount, total).then((res) => {
                    notify.showInfo('Receipt checked out');
                    ctx.redirect('#/receipt');
                }).catch(notify.handleError);
            } else {
                notify.showError('The receipt is empty.');
                ctx.redirect('#/receipt');
            }
        });

        this.get("#/overview", (ctx) => {
            ctx.name = sessionStorage.getItem('username');
            let userId = sessionStorage.getItem('userId');
            receiptService.getAllReceipts(userId).then((res) => {
                let totalAll = 0;
                res.forEach(x => {
                    x.date = new Date(x._kmd.ect);
                    totalAll += Number(x.total);
                });

                ctx.totalAll = totalAll;
                ctx.rows = res;

                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    navigation: 'templates/common/navigation.hbs',
                    footer: 'templates/common/footer.hbs',
                    row: 'templates/receipt/overview/row.hbs'
                }).then(function () {
                    this.partial('templates/receipt/overview/AllReceipt.hbs');
                })
            }).catch(notify.handleError);
        });

        this.get('#/receipt/:id/details', (ctx) => {
            ctx.name = sessionStorage.getItem('username');
            let receiptId = ctx.params.id;
            receiptService.getEntries(receiptId).then((res) => {
                res.forEach(x => {
                    x.subTotal = Number(x.qty) * Number(x.price);
                });

                ctx.rows = res;

                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    navigation: 'templates/common/navigation.hbs',
                    footer: 'templates/common/footer.hbs',
                    row: 'templates/receipt/details/row.hbs'
                }).then(function () {
                    this.partial('templates/receipt/details/receiptDetails.hbs');
                })

            }).catch(notify.handleError);
        });


        Handlebars.registerHelper('priceFixed', function (price) {
            return Number(price).toFixed(2);
        });
    });

    app.run();
});

function loadReceiptEditorView(ctx) {
    ctx.loadPartials({
        header: 'templates/common/header.hbs',
        footer: 'templates/common/footer.hbs',
        navigation: 'templates/common/navigation.hbs',
        createReceiptForm: 'templates/receipt/create/createReceiptForm.hbs',
        entryForm: 'templates/receipt/create/entryForm.hbs',
        row: 'templates/receipt/create/row.hbs'
    }).then(function () {
        this.partial('templates/receipt/create/createReceipt.hbs')
    })
}


function logoutUser(ctx) {
    auth.logout().then(function (res) {
        sessionStorage.clear();
        notify.showInfo('Logout successful.');
        ctx.redirect('#/home');
    }).catch(notify.handleError)
}

function loginUser(ctx) {
    let username = ctx.params.name;
    let password = ctx.params.pass;

    let nameRegex = /[A-Za-z0-9]{5,}/;
    if (!username.match(nameRegex) || password.length === 0) {
        notify.showError('Incorect username/password.Try again.');
    } else {
        auth.login(username, password).then(function (res) {
            auth.saveSession(res);
            notify.showInfo('Login successful.');
            ctx.redirect("#/home");
        }).catch(notify.handleError);
    }
}

function registerUser(ctx) {
    let username = ctx.params.name;
    let password = ctx.params.pass;
    let repeatPassword = ctx.params.repeatpass;

    let nameRegex = /[A-Za-z0-9]{5,}/;
    if (!username.match(nameRegex) || password.length === 0 || password !== repeatPassword) {
        notify.showError('Incorect username/password.Try again.');
    } else {
        auth.register(username, password).then((res) => {
            console.log(res);
            auth.saveSession(res);
            notify.showInfo('User registration successful.');
            ctx.redirect("#/home");
        }).catch(notify.handleError);
    }
}

function loadWelcome(ctx) {
    ctx.loadPartials({
        footer: 'templates/common/footer.hbs',
        loginForm: 'templates/welcome/loginForm.hbs',
        registerForm: 'templates/welcome/registerForm.hbs',
    }).then(function () {
        this.partial('templates/welcome/welcome.hbs')
    })
}

function loadHomeScreen(ctx) {
    if (auth.isAuth()) {
        ctx.redirect('#/receipt');
    } else {
        ctx.redirect('#/welcome');
    }
}