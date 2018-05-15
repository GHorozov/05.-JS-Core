let createBook =(function() {
    let id = 1;
    return function(selector, title, author, isbn){
        $(selector).append(
            $(`<div id="book${id++}">`).append(
                $(`<p class="title">${title}</p>`),
                $(`<p class="author">${author}</p>`),
                $(`<p class="isbn">${isbn}</p>`),
                $('<button>').text('Select').on('click', function () {
                    $(this).parent().css('border', '2px solid blue');
                }),
                $('<button>').text('Deselect').on('click', function () {
                    $(this).parent().css('border', 'none');
                })
            ));
    }
}());
