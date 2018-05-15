function restHouse(roomsArr, guestsArr) {
    let rooms = takeRooms(roomsArr);
    let peopleWithoutRoom =0;

    for (let pair of guestsArr) {
        let isFountRoom = false;
        if(pair.first.gender !== pair.second.gender){
            for (let [key, value] of rooms) {
                if(value.type === 'double-bedded' && value.betsInRoom === 2){
                    value.guests = [];
                    value.guests = [pair.first, pair.second];
                    value.betsInRoom = 0;
                    isFountRoom = true;
                    break;
                }
            }
        }else{
            for (let [key, value] of rooms) {
                if(value.type === 'triple' && value.betsInRoom > 1){
                    if (value.guests === undefined) {
                        value.guests = [];
                    } else if (value.guests[0].gender !== pair.second.gender) {
                        continue;
                    }
                    if (pair.first !== undefined) {
                        value.guests.push(pair.first);
                        value.betsInRoom -= 1;
                    }
                    value.guests.push(pair.second);
                    value.betsInRoom -= 1;
                    isFountRoom = true;
                    break;
                }else if(value.type === 'triple' && value.betsInRoom === 1){
                    if (value.guests[0].gender === pair.second.gender) {
                        value.guests.push(pair.first === undefined ? pair.second : pair.first);
                        value.betsInRoom -= 1;
                        pair.first = undefined;
                    }
                }
            }
        }

        if (!isFountRoom) {
            peopleWithoutRoom += pair.first == undefined ? 1 : 2;
        }
    }

    for (let [room, value] of [...rooms].sort()) {
        console.log((`Room number: ${room}`));
        if (value.guests != undefined) {
            for (let guest of value.guests.sort(function(a, b) {return a.name.toLowerCase().localeCompare(b.name.toLowerCase())})) {
                console.log(`--Guest Name: ${guest.name}`);
                console.log(`--Guest Age: ${guest.age}`);
            }
        }
        console.log(`Empty beds in the room: ${value.betsInRoom}`);
    }
    console.log(`Guests moved to the tea house: ${peopleWithoutRoom}`);


   function takeRooms(roomsArr){
       let rooms = new Map();
       for (let room of roomsArr) {
           let betsNumber = room.type == 'double-bedded'? 2 : 3;
           rooms.set(room.number, {type: room.type , betsInRoom: betsNumber});
       }

       return rooms;
   }
}

restHouse(
    [
        { number: '206', type: 'double-bedded' },
        { number: '311', type: 'triple' }
    ],
    [
        { first: { name: 'Tanya Popova', gender: 'female', age: 24 },
        second: { name: 'Miglena Yovcheva', gender: 'female', age: 23 } },

        { first: { name: 'Katerina Stefanova', gender: 'female', age: 23 },
            second: { name: 'Angel Nachev', gender: 'male', age: 22 } },

        { first: { name: 'Tatyana Germanova', gender: 'female', age: 23 },
            second: { name: 'Boryana Baeva', gender: 'female', age: 22 } }

    ]
);