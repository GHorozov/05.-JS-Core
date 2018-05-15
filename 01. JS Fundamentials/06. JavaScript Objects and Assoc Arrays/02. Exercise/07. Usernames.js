function usernames(arr) {
    let catalogue =new Set();

    for (let name of arr) {
        catalogue.add(name.trim());
    }

    function orderByLenghtAndAlfabetically(a, b) {
        if(a.length > b.length) return 1;
        if(a.length < b.length) return -1;

        return a.localeCompare(b);
        };

    console.log([...catalogue].sort(orderByLenghtAndAlfabetically).join('\n'));
}

usernames(
    ['Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston']
);