function domSearch(selector, boolValue) {
    $(selector).append($('<div>')
        .addClass('add-controls')
        .append($('<label>').text('Enter text:').append($('<input>')))
        .append($('<a>')
            .addClass('button')
            .css('display', 'inline-block')
            .text('Add')
            .click(function () {
                let elementText = $('label input');
                let newLi = $('<li>')
                    .addClass('list-item')
                    .append($('<a>').addClass('button').text('X')
                    .click(function () {
                        $(this).parent().remove();
                    }))
                    .append($('<strong>').text(elementText.val().trim()));


                $('ul.items-list').append(newLi);
                elementText.val('');
            })
    ));



    $(selector).append($('<div>').addClass('search-controls')
            .append($('<label>').text('Search:')
                .append($('<input>')
                    .on('input', function () {
                        let inputValue = $(this).val();
                        let items = $('.list-item strong').toArray();

                        for (let item of items) {
                            let current = $(item);
                            console.log(current);
                            if(boolValue){
                                if (current.text().indexOf(inputValue) < 0) {
                                    current.parent().css('display', 'none') //hide
                                } else {
                                    current.parent().css('display', '') //show
                                }

                            }else{
                                if (current.text().toLowerCase().indexOf(inputValue.toLowerCase()) < 0) {
                                    current.parent().css('display', 'none')
                                } else {
                                    current.parent().css('display', '')
                                }
                            }
                        }
                    }
                    ))));

    $(selector).append($('<div>')
        .addClass('result-controls')
            .append($('<ul>')
                .addClass('items-list'))
    );

}
