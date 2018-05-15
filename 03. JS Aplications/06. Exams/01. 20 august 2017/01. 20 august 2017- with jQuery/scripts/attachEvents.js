function attachAllEvents() {
    //navigation menu link events
    $('#logout').on('click', logoutUser);
    $('#catalogLink').on('click', listCatalogPosts);
    $('#submitLinkLInk').on('click', showSubmitLink);
    $('#myPostsLink').on('click', loadMyPosts);

    //submit button events
    $('#btnRegister').on('click', registerUser);
    $('#btnLogin').on('click', loginUser);
    $('#btnSubmitPost').on('click', createPost);


    //bind info boxes
    $('#infoBox, #errorBox').on('click', function () {
        $(this).fadeOut();
    });

    //Attach AJAX loading event listener
    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show()
        },
        ajaxStop: function () {
            $('#loadingBox').hide()
        }
    })
}