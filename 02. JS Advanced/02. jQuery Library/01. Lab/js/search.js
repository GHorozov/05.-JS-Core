function search() {
    let inputText = $('#searchText').val();
    let count=0;
    $('#towns').find('li')
        .toArray()
        .forEach(x => {
            if(x.textContent.includes(inputText)){
                $(x).css('font-weight', 'bold');
                count++;
            }
        });
    $('#result').text(count + ' matches found.');
}