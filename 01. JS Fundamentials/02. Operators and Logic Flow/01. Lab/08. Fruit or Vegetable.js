function isFroidOrVegetable(word) {
    let fruids = ['banana', 'apple', 'kiwi', 'cherry', 'lemon', 'grapes', 'peach'];
    let vegetables = ['tomato', 'cucumber', 'pepper', 'onion', 'garlic', 'parsley'];

    if(fruids.some(x =>  x === word)){
        console.log('fruit');
    }
    else if(vegetables.some(x => x === word)){
        console.log('vegetable');
    }
    else{
        console.log('unknown');
    }
}

isFroidOrVegetable("garlic");