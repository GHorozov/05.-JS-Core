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

 console.log('' + makeCard('A', 'S'));	//A♠
 console.log('' + makeCard('10', 'H'));	//10♥
//console.log('' + makeCard('1', 'C'));	//Error
//console.log('' + makeCard('2', 'F'));	//Error
