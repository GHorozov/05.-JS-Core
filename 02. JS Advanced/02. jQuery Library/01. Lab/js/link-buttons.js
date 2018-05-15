function attachEvents() {
    let but = $('a').on('click', buttonClicked);
    function buttonClicked(){
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}