function tickets(arr, sortMethod) {
    let tickets = [];
    class Ticket{
        constructor(destination, price, status){
            this.destination= destination;
            this.price = price;
            this.status = status;
        }
    }

    for (let item of arr) {
        let parts = item.split('|');
        let destination = parts[0];
        let price = Number(parts[1]);
        let status = parts[2];

        let newTicket = new Ticket(destination, price, status);
        tickets.push(newTicket);
    }

    if(sortMethod === 'destination'){
        return tickets.sort((a, b) => a.destination.localeCompare(b.destination));
    }else if(sortMethod == 'price'){
        return tickets.sort((a, b) => a.price - b.price);
    }else if(sortMethod === 'status'){
        return tickets.sort((a, b) => a.status.localeCompare(b.status));
    }
}

console.log(tickets(
    [
        'Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'
    ],
    'destination'
));

console.log(tickets(
    [
        'Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'
    ],
    'status'
));