function attachEvents() {
    $('#items').find('li').on('click', clickedTown);
    function clickedTown() {
        if(!$(this).attr('data-selected')) {
            $(this).attr('data-selected', true);
            $(this).css('background-color', '#DDD');
        }else{
            $(this).removeAttr('data-selected');
            $(this).css('background-color', '');
        }
        $('#showTownsButton').on('click', function () {
            let result = $('#items > li[data-selected]')
                .toArray()
                .map(li => $(li).text()).join(', ');
            $('#selectedTowns').text('Selected towns: ' +  result);
        })
    }
}
