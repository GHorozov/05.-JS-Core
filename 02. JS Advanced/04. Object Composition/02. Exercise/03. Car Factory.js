function carFactory(inputObj) {
    let obj= {};
    obj.model = inputObj.model;
    if(inputObj.power <= 90){
        obj.engine = {
            power:90,
            volume: 1800
        }
    }else if(inputObj.power <= 120){
        obj.engine = {
            power:120,
            volume: 2400
        }
    }else{
        obj.engine = {
            power:200,
            volume: 3500
        }
    }
    obj.carriage = {
        type: inputObj.carriage,
        color: inputObj.color
    };

    let size = Number(inputObj.wheelsize) % 2 === 0 ? Number(inputObj.wheelsize) - 1 : Number(inputObj.wheelsize);
    obj.wheels = [size, size, size, size];
    return obj;
}

let input = { model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14 };

console.log(carFactory(input));
