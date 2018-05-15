function extractText() {
    let liValues = $('#items').find('li')
        .toArray()
        .map(li => $(li).text()).join(', ');

    $('#result').text(liValues);
}