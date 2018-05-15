function addRemoveElements(arr) {
    let initialNumber =1;
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let command = arr[i];
        if(command === 'add'){
            result.push(initialNumber);
        }

        if(arr.length > 0 && command === 'remove'){
            result.pop();
        }

        initialNumber++;
    }

    if(result.length > 0){
        return result.join('\n');
    }else {
        return 'Empty';
    }
}

console.log(addRemoveElements(['add', 'add', 'add', 'add']));
console.log(addRemoveElements(['add', 'add', 'remove', 'add', 'add']));