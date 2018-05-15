function attachEvents() {
    $('#btnLoadTowns').on('click', function () {
        let towns = $('#towns').val().split(',').map(x => ({town: x.trim()})).filter(x => x.town !== '');
        loadTowns(towns);
    });

    async function loadTowns(towns) {
        let source = await $.get('./towns-template.hbs');
        let compiled = Handlebars.compile(source);
        let template = compiled({
            towns
        });
        $('#root').append(template);
    }
}