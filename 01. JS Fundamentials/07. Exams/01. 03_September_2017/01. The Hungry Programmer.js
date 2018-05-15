function solution(meals, commands) {
    let mealEaten = 0;
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        if(command === 'End'){
            if(meals.length > 0){
                console.log(`Meals left: ${meals.join(', ')}`);
            }else{
                console.log('The food is gone');
            }
            console.log(`Meals eaten: ${mealEaten}`);
            break;
        }

        if(command === 'Serve'){
            if(meals.length > 0) {
                console.log(`${meals.pop()} served!`);
            }
        }else if(command === 'Eat'){
            if(meals.length > 0) {
                console.log(`${meals.shift()} eaten`);
                mealEaten += 1;
            }
        }else if(command.startsWith('Add')){
            let parts = command.split(' ');
            if(parts.length < 1 || parts[1] === undefined) continue;
            let meal = parts[1];
            meals.unshift(meal);
        }else if(command.startsWith('Consume')){
            let parts = command.split(' ');
            if(parts < 2) continue;
            let firstIndex = Number(parts[1]);
            let secondIndex = Number(parts[2]);

            if( firstIndex !== undefined && secondIndex !== undefined
                && firstIndex < secondIndex
                && firstIndex >= 0 && firstIndex <= meals.length-1
                && secondIndex >= 0 && secondIndex <= meals.length-1) {

                if(firstIndex == 0){
                    meals.splice(firstIndex, secondIndex+1);
                    mealEaten += secondIndex+1;
                }else{
                    meals.splice(firstIndex, secondIndex);
                    mealEaten += secondIndex;
                }

                console.log('Burp!');
            }
        }else if(command.startsWith('Shift')){
            let parts = command.split(' ');
            if(parts < 2) continue;
            let firstIndex = Number(parts[1]);
            let secondIndex = Number(parts[2]);

            if(firstIndex >= 0 && firstIndex <= meals.length-1 && secondIndex >= 0 && secondIndex <= meals.length-1) {
                firstName = meals[firstIndex];
                secondName = meals[secondIndex];
                meals[firstIndex] = secondName;
                meals[secondIndex] = firstName;
            }
        }
    }
}

solution(
    ['chicken', 'steak', 'eggs'],
    ['Serve', 'Eat', 'End', 'Consume 0 1']
);

solution(['fries', 'fish', 'beer', 'chicken', 'beer', 'eggs'],
    ['Add spaghetti', 'Shift 0 1', 'Consume 1 4', 'End']
);

solution(
    ['carrots', 'apple', 'beet'],
    ['Consume 0 2', 'End',]
);