function printDeckOfCards(arr) {
    function makeCard(card, suit) {
        const ValidCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const ValidSuits = {
            S: '\u2660',
            H: '\u2665',
            D: '\u2666',
            C: '\u2663'
        };

        if(!ValidCards.includes(card) || !Object.keys(ValidSuits).includes(suit)){
            throw new Error('Error')
        }

        return{
            card: card,
            suit: suit,
            toString: function() {
                return card + ValidSuits[suit];
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        let card = arr[i].substr(0, arr[i].length-1);
        let suit = arr[i][arr[i].length-1];

        try {
            arr[i] = makeCard(card, suit);
        }catch (ex){
            console.log('Invalid card: ' + arr[i]);
            return;
        }
    }

    console.log(arr.join(' '));
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);	//A♠ 10♦ K♥ 2♣
printDeckOfCards(['5S', '3D', 'QD', '1C']);	//Invalid card: 1C
