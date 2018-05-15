function listCatalogPosts() {
    $.ajax({
        method: 'GET',
        url: BaseUrl + 'appdata/' + AppKey + '/posts',
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        displayAllPosts(res);
    }).catch(handleAjaxError);

    async function displayAllPosts(res) {
        showCatalogView();
        let posts = $('#viewCatalog .posts');
        posts.empty();

        if (res.length > 0) {

            async function f() {
                res.forEach(x => {
                   if(x.author === sessionStorage.getItem('username')){
                       x.isAuthor = true;
                   }
                });

                res.forEach(x => {
                    x.submited = calcTime(x._kmd.ect);
                });

                let sortedAllPosts = res.sort((a,b) => {
                    return new Date(b._kmd.ect) - new Date(a._kmd.ect)
                });

                let source = await $.get('templates/catalogPost-template.hbs');
                let compile = Handlebars.compile(source);
                let template = compile({
                    posts: sortedAllPosts
                });

                posts.append(template);
                attachEvents();
            }

            await f();

            function attachEvents() {
                $('.commentsLink').on('click', loadPostDetails);
                $('.editLink').on('click', editPost);
                $('.deleteLink').on('click', deletePost);
            }
        } else {
            posts.empty();
            posts.append($('<p>No posts in database</p>'));
        }
    }

}

function loadPostDetails(postId) { //to do
    showPostDetails();
    let post = $('#viewComments');
    post.empty();

    let id;
    if (postId.length > 0) {
        id = postId;
    } else {
        id = $(this).parent().parent().parent().parent().parent().parent().data().id;
    }

    $.ajax({
        method: 'GET',
        url: BaseUrl + 'appdata/' + AppKey + '/posts/' + id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        displayPost(res);
        displayComments(res, id);
    }).catch(handleAjaxError);

    async function displayPost(res) {
        async function f() {
            res.submited = calcTime(res._kmd.ect);
            if (res.author === sessionStorage.getItem('username')) {
                res.isAuthor = true;
            }
            res.description = '';
            let checkDescription = false;
            if (res.description.length === 0) {
                checkDescription = true;
            }
            let source = await $.get('./templates/postDetails-template.hbs');
            let compile = Handlebars.compile(source);
            let template = compile({
                url: res.url,
                imageUrl: res.imageUrl,
                title: res.title,
                description: res.description,
                submited: res.submited,
                isAuthor: res.isAuthor,
                author: res.author,
                id: res._id,
                checkDescription: checkDescription
            });

            $('#viewComments').append(template);
            attachEvents();
        }

        await f();

        function attachEvents() {
            $('.editLink').on('click', editPost);
            $('.deleteLink').on('click', deletePost);
            $('#btnPostComment').on('click', createComment)
        }
    }
}

async function displayComments(res, id) {
    $('#viewComments').empty();
    $.ajax({
        method: 'GET',
        url: BaseUrl + 'appdata/' + AppKey + '/comments',
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
    }).then(function (res) {
        commentsFunc(res);
    }).catch(handleAjaxError);

    async function commentsFunc(res) {
        let comments = [];
        for (let comment of res) {
            if (comment.postId === id) {
                comments.push(comment);
            }
        }
        if (comments.length > 0) {
            async function f() {
                comments.forEach(el => {
                    if (el.author === sessionStorage.getItem('username')) {
                        el.isAuthor = true;
                    }
                });
                comments.forEach(el => {
                    el.submited = calcTime(el._kmd.ect)
                });
                let sorted = comments.sort((a, b) => {
                    return new Date(b._kmd.ect) - new Date(a._kmd.ect);
                });

                let source = await $.get('./templates/comments.hbs');
                let compile = Handlebars.compile(source);
                let template = compile({
                    comments: sorted
                });

                $('#viewComments').append(template);
                attachEvents();
            }

            await f();

            function attachEvents() {
                $('.deleteLink').on('click', deleteComment);
            }
        }
        else {
            $('#viewComments').append($('<p>No posts in database</p>'));
        }
    }
}

function createComment() {
    event.preventDefault();
    let postId = $('#viewComments .post').data().id;
    let author = sessionStorage.getItem('username');
    let text = $($(this).parent().children()[1]).val();

    $.ajax({
        method: 'POST',
        url: BaseUrl + 'appdata/' + AppKey + '/comments',
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {
            author: author,
            postId: postId,
            content: text,
        }
    }).then(async function () {
        showInfo('Comment created.');
        await loadPostDetails(postId);
        $(text).val('');
    }).catch(handleAjaxError)
}

function deleteComment() {
    event.preventDefault();
    let id = $(this).parent().parent().data().id;
    let postId = $('#viewComments .post').data().id;

    $.ajax({
        method: 'DELETE',
        url: BaseUrl + 'appdata/' + AppKey + '/comments/' + id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
    }).then(async function () {
        await loadPostDetails(postId);
        showInfo('Comment deleted.')
    }).catch(handleAjaxError);
}


function editPost() {
    $('#editPostForm input[name=url]').val('');
    $('#editPostForm input[name=title]').val('');
    $('#editPostForm input[name=image]').val('');
    $('#editPostForm textarea[name=description]').text('');
    let id = $(this).parent().parent().parent().parent().parent().parent().data().id;
    $('#viewEdit').val(id); //add value to id for viewEdit

    $.ajax({
        method: 'GET',
        url: BaseUrl + 'appdata/' + AppKey + '/posts/' + id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        let url = res.url;
        let title = res.title;
        let image = res.imageUrl;
        let description = res.description;

        showEditView();
        $('#editPostForm input[name=url]').val(url);
        $('#editPostForm input[name=title]').val(title);
        $('#editPostForm input[name=image]').val(image);
        $('#editPostForm textarea[name=description]').text(description);

        $('#btnEditPost').on('click', function () {
            let author = sessionStorage.getItem('username');
            let title = $('#editPostForm  input[name=title]').val();
            let description = $('#editPostForm textarea[name=comment]').val();
            let url = $('#editPostForm input[name=url]').val();
            let imageUrl = $('#editPostForm input[name=image]').val();

            if(!url.startsWith('https') || url.length === 0 || title.length ===0){
                showError('Invalid credentials. Please retry your request with correct credentials');
            }else {
                let id = $('#viewEdit').val();
                console.log(id);
                $.ajax({
                    method: 'PUT',
                    url: BaseUrl + 'appdata/' + AppKey + '/posts/' + id,
                    headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
                    data: {
                        author,
                        title,
                        description,
                        url,
                        imageUrl
                    }
                }).then(function (res) {
                    showInfo(`Post ${title} updated`);
                    listCatalogPosts();
                }).catch(handleAjaxError);
            }
        });
    }).catch(handleAjaxError);
}

function deletePost() {
    event.preventDefault();
    let id = $(this).parent().parent().parent().parent().parent().parent().data().id;
    $.ajax({
        method: 'DELETE',
        url: BaseUrl + 'appdata/' + AppKey + '/posts/' + id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
    }).then(function (res) {
        listCatalogPosts();
        showInfo('Post deleted.')
    }).catch(handleAjaxError);
}

function createPost() {
    event.preventDefault();

    let author = sessionStorage.getItem('username');
    let title = $('#viewSubmit #submitForm input[name=title]').val();
    let description = $('#viewSubmit #submitForm textarea[name=comment]').val();
    let url = $('#viewSubmit #submitForm input[name=url]').val();
    let imageUrl = $('#viewSubmit #submitForm input[name=image]').val();

    if(!url.startsWith('https') || url.length === 0 || title.length ===0){
        showError('Incorect input!Input fields again!');
    }else {
        $.ajax({
            method: 'POST',
            url: BaseUrl + 'appdata/' + AppKey + '/posts',
            headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {
                author,
                title,
                description,
                url,
                imageUrl
            }
        }).then(function (res) {
            showInfo('Post created.');
            listCatalogPosts();
        }).catch(handleAjaxError);
    }
}

function loadMyPosts() {
    $.ajax({
        method: 'Get',
        url: BaseUrl + 'appdata/' + AppKey + '/posts',
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        displayPosts(res);
    }).catch(handleAjaxError);

    async function displayPosts(res) {
        showMyPosts();
        let posts = $('#viewMyPosts .posts');
        posts.empty();

        if (res.length > 0) {

            async function f() {
                let myPostList = [];

                res.forEach(x => {
                    if (x._acl.creator === sessionStorage.getItem('userId')) {
                        x.isAuthor = true;
                        myPostList.push(x);
                    }
                });

                if (myPostList.length > 0) {
                    myPostList.forEach(x => {
                        x.submited = calcTime(x._kmd.ect);
                    });

                    let sortedMyPostList = myPostList.sort((a, b) => new Date(b._kmd.ect) - new Date(a._kmd.ect));

                    let source = await $.get('templates/catalogPost-template.hbs');
                    let compile = Handlebars.compile(source);
                    let template = compile({
                        posts: sortedMyPostList
                    });

                    posts.append(template);
                    attachEvents();
                } else {
                    posts.append($('<p>No posts in database</p>'))
                }
            }

            await f();

            function attachEvents() {
                $('.commentsLink').on('click', loadPostDetails);
                $('.editLink').on('click', editPost);
                $('.deleteLink').on('click', deletePost);
            }

        }else{
            posts.empty();
            posts.append($('<p>No posts in database</p>'));
        }
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


function handleAjaxError(err) {
    let errorMsg = JSON.stringify(err);
    if (err.readyState === 0) {
        errorMsg = "Cannot connect due to network error.";
    }
    if (err.responseJSON && err.responseJSON.description) {
        errorMsg = err.responseJSON.description;
    }
    showError(errorMsg);
}