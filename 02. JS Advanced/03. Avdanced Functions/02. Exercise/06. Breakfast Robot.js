let manager = (() => {
    let ingredients = {};
    ingredients['protein'] = 0;
    ingredients['carbohydrate'] = 0;
    ingredients['fat'] = 0;
    ingredients['flavour'] = 0;

    return function (input) {
        if (input === undefined) {
            return;
        }

        let parts = input.split(' ');
        let command = parts.shift();
        switch (command) {
            case "prepare":
                return prepare(parts);
            case "restock":
                return restock(parts);
            case "report":
                return report();
        }

        return 'Error: Command does not exists!';
    };


    function restock([microelement, quantity]) {
        ingredients[microelement] += Number(quantity);
        return 'Success';
    }

    function prepare([recipe, quantity]) {
        quantity = Number(quantity);
        let errorMessage = "";
        switch (recipe.toLowerCase()){
            case "apple":
                if(ingredients['flavour'] < (quantity * 2)){
                    errorMessage = "Error: not enough flavour in stock";
                }

                if(ingredients['carbohydrate'] < (quantity)){
                    errorMessage = "Error: not enough carbohydrate in stock";
                }

                if(errorMessage === ""){
                    ingredients['carbohydrate']-= quantity;
                    ingredients['flavour'] -= quantity*2;
                    return "Success";
                }
                return errorMessage;
                break;
            case "coke":
                if(ingredients['flavour'] < (quantity * 20)){
                    errorMessage = "Error: not enough flavour in stock";
                }
                if(ingredients['carbohydrate'] < (quantity * 10)){
                    errorMessage = "Error: not enough carbohydrate in stock";
                }

                if(errorMessage === ""){
                    ingredients['carbohydrate']-= quantity * 10;
                    ingredients['flavour'] -= quantity * 20;
                    return "Success";
                }
                return errorMessage;
                break;
            case "burger":
                if(ingredients['flavour'] < (quantity * 3)){
                    errorMessage = "Error: not enough flavour in stock";
                }
                if(ingredients['fat'] < (quantity * 7)){
                    errorMessage = "Error: not enough fat in stock";
                }
                if(ingredients['carbohydrate'] < (quantity * 5)){
                    errorMessage = "Error: not enough carbohydrate in stock";
                }

                if(errorMessage === ""){
                    ingredients['carbohydrate']-= quantity * 5;
                    ingredients['flavour'] -= quantity * 3;
                    ingredients['fat'] -= quantity * 7;
                    return "Success";
                }
                return errorMessage;
                break;
            case "omelet":
                if(ingredients['flavour'] < (quantity)){
                    errorMessage = "Error: not enough flavour in stock";
                }
                if(ingredients['fat'] < (quantity)){
                    errorMessage = "Error: not enough fat in stock";
                }
                if(ingredients['protein'] < (quantity * 5)){
                    errorMessage = "Error: not enough protein in stock";
                }

                if(errorMessage === ""){
                    ingredients['protein']-= quantity * 5;
                    ingredients['flavour'] -= quantity;
                    ingredients['fat'] -= quantity;
                    return "Success";
                }
                return errorMessage;
                break;
            case "cheverme":
                if(ingredients['flavour'] < (quantity * 10)){
                    errorMessage = "Error: not enough flavour in stock";
                }
                if(ingredients['fat'] < (quantity * 10)){
                    errorMessage = "Error: not enough fat in stock";
                }
                if(ingredients['carbohydrate'] < (quantity * 10)){
                    errorMessage = "Error: not enough carbohydrate in stock";
                }
                if(ingredients['protein'] < (quantity * 10)){
                    errorMessage = "Error: not enough protein in stock";
                }

                if(errorMessage === ""){
                    ingredients['protein']-= quantity * 10;
                    ingredients['carbohydrate'] -= quantity * 10;
                    ingredients['flavour'] -= quantity * 10;
                    ingredients['fat'] -= quantity * 10;
                    return "Success";
                }
                return errorMessage;
                break;
        }
    }

    function report() {
        return Object.keys(ingredients).map(ing => `${ing}=${ingredients[ing]}`).join(' ');
    }

})();

console.log(manager("restock carbohydrate 10"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare apple 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare burger 1"));
console.log(manager("report"));
