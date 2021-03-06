function calcTicketPrice(params) {
    let title = params[0].toLowerCase();
    let day = params[1].toLowerCase();

    // let movies = ['the godfather', 'schindler\'s list', 'casablanca', 'the wizard of oz' ];
    //
    // if(!movies.includes(title)){
    //     return 'error';
    // }
    //
    // let weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ];
    // if(!weekDays.includes(day)){
    //     return 'error';
    // }

    if(title == 'the godfather') {
        switch (day) {
            case 'monday': return 12;
            case 'tuesday': return 10;
            case 'wednesday': return 15;
            case 'thursday': return 12.50;
            case 'friday': return 15;
            case 'saturday': return 25;
            case 'sunday': return 30;
            default: return 'error';
        }
    } else if(title == 'schindler\'s list') {
        switch (day) {
            case 'monday': return 8.50;
            case 'tuesday': return 8.50;
            case 'wednesday': return 8.50;
            case 'thursday': return 8.50;
            case 'friday': return 8.50;
            case 'saturday': return 15;
            case 'sunday': return 15;
            default: return 'error';
        }
    } else if(title == 'casablanca') {
        switch (day) {
            case 'monday': return 8;
            case 'tuesday': return 8;
            case 'wednesday': return 8;
            case 'thursday': return 8;
            case 'friday': return 8;
            case 'saturday': return 10;
            case 'sunday': return 10;
            default: return 'error';
        }
    } else if(title == 'the wizard of oz') {
        switch (day) {
            case 'monday': return 10;
            case 'tuesday': return 10;
            case 'wednesday': return 10;
            case 'thursday': return 10;
            case 'friday': return 10;
            case 'saturday': return 15;
            case 'sunday': return 15;
            default: return 'error';
        }
    } else {
        return 'error';
    }
}

//console.log(calcTicketPrice(['The Godfather'.toLowerCase(), 'Thursday'.toLowerCase()]));
console.log(calcTicketPrice(['The Godfather', 'Friday']));
// console.log(calcTicketPrice(['casablanca'.toLowerCase(), 'Sunday'.toLowerCase()]));
// console.log(calcTicketPrice(['Schindler\'s LIST'.toLowerCase(), 'monday'.toLowerCase()]));
// console.log(calcTicketPrice(['SoftUni'.toLowerCase(), 'Nineday'.toLowerCase()]));