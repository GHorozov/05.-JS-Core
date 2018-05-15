function sortArray(arr) {
    console.log(arr.sort((a, b) => a.localeCompare(b)) //first sort compare alfabeticaly.
        .sort((a, b) => a.length - b.length) //second sort by word lenght.
        .join('\n'));

}

sortArray(['alpha', 'beta', 'gamma']);