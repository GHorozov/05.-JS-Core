$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        let cats = window.cats;
        let source = await $.get('cat-template.hbs');
        let compiled = Handlebars.compile(source);
        let template = compiled({
            cats
        });
        $('body').append(template);
        
        $('.btn-info').on('click', function (ev) {
            let targetBtn = $(ev.target);
            let infoDiv = targetBtn.next();
            infoDiv.toggle(); //show or hide
        })
    }
});
