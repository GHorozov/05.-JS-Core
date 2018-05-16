$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get("index.html", loadHomeScreen);
        this.get("#/home", loadHomeScreen);

        this.post("#/register", function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repPassword = ctx.params.repeatPass;

            if (!/^[A-Za-z]{3,}$/.test(username)) {
                notify.showError("Username shouldn`t be less than 3 characters!")
            } else if (!/^[A-Za-z\d]{6,}$/.test(password)) {
                notify.showError("Password shouldn`t be less than 6 characters!")
            } else if (password !== repPassword) {
                notify.showError("Passwords mismatch!")
            } else {
                auth.register(username, password)
                    .then((res) => {
                        auth.saveSession(res);
                        notify.showInfo("User registration successful.");
                        ctx.redirect("#/catalog");
                    })
                    .catch(notify.handleError);
            }
        });

        this.post("#/login", function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            if (!/^[A-Za-z]{3,}$/.test(username)) {
                notify.showError("Username shouldn`t be less than 3 characters!")
            } else if (!/^[A-Za-z\d]{6,}$/.test(password)) {
                notify.showError("Password shouldn`t be less than 6 characters!")
            } else {
                auth.login(username, password)
                    .then((user) => {
                        auth.saveSession(user);
                        notify.showInfo("Login successful.");
                        ctx.redirect("#/catalog");
                    })
                    .catch(notify.handleError);
            }
        });

        this.get("#/logout", function (ctx) {
            auth.logout()
                .then((res) => {
                    sessionStorage.clear();
                    notify.showInfo("Logout successful.");
                    ctx.redirect("#/home");
                })
                .catch(notify.handleError);
        });

        this.get('#/catalog', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home'); // to avoid manual redirect from url by user
            }

            service.getAllPosts().then((res) => {
                res.forEach((x, i) => {
                    x.rank = i + 1;
                    x.date = calcTime(x._kmd.ect);
                    x.isAuthor = x._acl.creator === sessionStorage.getItem('userId');
                });

                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem('username');
                ctx.posts = res;

                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    navigation: 'templates/common/navigation.hbs',
                    footer: 'templates/common/footer.hbs',
                    allPosts: 'templates/posts/allPosts.hbs',
                    post: 'templates/posts/post.hbs'
                }).then(function () {
                    this.partial('templates/posts/catalogPage.hbs')
                })

            }).catch(notify.handleError);
        });

        this.get('#/create/post', function (ctx) {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: 'templates/common/header.hbs',
                navigation: 'templates/common/navigation.hbs',
                footer: 'templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/createPost/createPostPage.hbs')
            })
        });

        this.post('#/create/post', function (ctx) {
            let author = sessionStorage.getItem('username');
            let url = ctx.params.url;
            let title = ctx.params.title;
            let imageUrl = ctx.params.image;
            let description = ctx.params.comment;

            if (!url.startsWith('http' || url.length === 0)) {
                notify.showError('url should start with http and connot be empty string.')
            } else if (title.length === 0) {
                notify.showError('Title connot be empty string.')
            } else {
                service.cratePost(author, title, description, url, imageUrl).then((res) => {
                    notify.showInfo('Post created.');
                    ctx.redirect('#/catalog');
                }).catch(notify.handleError);
            }
        });

        this.get('#/edit/post/:id', function (ctx) {
            let postId = ctx.params.id;

            service.getPostById(postId).then((res) => {
                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem('username');

                ctx.post = res;

                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    navigation: 'templates/common/navigation.hbs',
                    footer: 'templates/common/footer.hbs'
                }).then(function () {
                    this.partial('templates/editPage/editPage.hbs')
                })

            }).catch(notify.handleError);
        });

        this.post('#/edit/post/:id', function (ctx) {
            let postId = ctx.params.id;
            let author = sessionStorage.getItem('username');
            let title = ctx.params.title;
            let description = ctx.params.description;
            let url = ctx.params.url;
            let imageUrl = ctx.params.image;

            if (!url.startsWith('http') || url.length === 0) {
                notify.showError('url should start with http and connot be empty string.')
            } else if (title.length === 0) {
                notify.showError('Title connot be empty string.')
            } else {
                service.editPost(postId, author, title, description, url, imageUrl).then((res) => {
                    notify.showInfo('Post edited.');
                    ctx.redirect('#/catalog');
                }).catch(notify.handleError);
            }
        });

        this.get('#/delete/post/:id', function (ctx) {
            let postId = ctx.params.id;

            service.deletePost(postId).then((res) => {
                notify.showInfo('Post deleted.');
                ctx.redirect('#/catalog');
            }).catch(notify.handleError);
        });

        this.get('#/myPosts', function (ctx) {
            let username = sessionStorage.getItem('username');

            service.myPosts(username).then((res) => {
                res.forEach((x, i) => {
                    x.rank = i + 1;
                    x.date = calcTime(x._kmd.ect);
                    x.isAuthor = x._acl.creator === sessionStorage.getItem('userId');
                });

                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem('username');

                ctx.posts = res;

                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    navigation: 'templates/common/navigation.hbs',
                    footer: 'templates/common/footer.hbs',
                    post: 'templates/posts/post.hbs'
                }).then(function () {
                    this.partial('templates/myPosts/myPosts.hbs')
                })
            }).catch(notify.handleError);
        });

        this.get('#/details/:id', function (ctx) {
            let postId = ctx.params.id;

            const postPromise = service.getPostById(postId);
            const allComments = service.postComments(postId);

            Promise.all([postPromise, allComments]).then(([post, comments]) => {
                post.isAuthor = post._acl.creator === sessionStorage.getItem('userId');
                post.date = calcTime(post._kmd.ect);

                comments.forEach(x => {
                    x.date = calcTime(x._kmd.ect);
                    x.commentAuthor = x._acl.creator === sessionStorage.getItem('userId');
                });

                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem('username');
                ctx.post = post;
                ctx.comments = comments;

                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    navigation: 'templates/common/navigation.hbs',
                    footer: 'templates/common/footer.hbs',
                    comment: 'templates/postDetails/comment.hbs'
                }).then(function () {
                    this.partial('templates/postDetails/postDetails.hbs')
                })
            }).catch(notify.handleError);
        });

        this.post('#/create/comment/:id', function (ctx) {
            let postId = ctx.params.id;
            let content = ctx.params.content;
            let author = sessionStorage.getItem('username');

            if(content.length === 0){
                notify.showInfo('Content cannot be empty.')
            }else{
                service.createComment(postId, content, author).then((res) => {
                    notify.showInfo('Comment created');
                    ctx.redirect(`#/details/${postId}`);
                }).catch(notify.handleError);
            }

        });

        this.get('#/comment/delete/:commentId/post/:postId', function (ctx) {
            let commentId = ctx.params.commentId;
            let postId = ctx.params.postId;

            service.deleteComment(commentId).then((res) => {
                notify.showInfo('Comment deleted.');
                ctx.redirect(`#/details/${postId}`);
            }).catch(notify.handleError);
        });


        function loadHomeScreen(ctx) {
            if (!auth.isAuth()) {
                ctx.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs'
                }).then(function () {
                    this.partial('templates/home/home.hbs')
                })
            } else {
                ctx.redirect('#/catalog');
            }
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
    });

    app.run();
});



