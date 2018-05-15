function wikiParser(selector ) {
    let text= $(selector).text();
    let formattedText = text
        .replace(/===([^'=\[\]]+?)===/gm, (match, gr1) => `<h3>${gr1}</h3>`)
        .replace(/==([^'=\[\]]+?)==/gm, (match, gr1) => `<h2>${gr1}</h2>`)
        .replace(/=([^'=\[\]]+?)=/gm, (match, gr1) => `<h1>${gr1}</h1>`)
        .replace(/'''([^'=\[]+?)'''/gm, (match, gr1) => `<b>${gr1}</b>`)
        .replace(/''([^'=\[]+?)''/gm, (match, gr1) => `<i>${gr1}</i>`)
        .replace(/\[\[([^'=\[\]]+?)\|([^'=\[\]]+?)]]/gm, (match, gr1, gr2) => `<a href="/wiki/${gr1}">${gr2}</a>`)
        .replace(/\[\[([^'=\[\]]+?)]]/gm, (match, gr1) => `<a href="/wiki/${gr1}">${gr1}</a>`);

    $(selector).html(formattedText);
}
