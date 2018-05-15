function attachAllEvents() {
    //navigation menu link events
    $('#logout').on('click', logoutUser);
    $('#editorId').on('click', displayActiveReceipt);


    //submit button events
    $('#registerBtn').on('click', registerUser);
    $('#loginBtn').on('click', loginUser);
    $('#create-entry-form #addItemBtn').on('click', createReceipt);

    //bind info boxes
    $('#infoBox, #errorBox').on('click', function () { //to see if the same
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