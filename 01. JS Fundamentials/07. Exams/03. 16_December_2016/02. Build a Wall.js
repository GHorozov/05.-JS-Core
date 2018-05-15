function solution(input) {
    let wallHeights = input.map(Number);
    let concretePrice =  1900;
    let totalConcrete = [];

    while(true){
        let build = false;
        let dailyConcrete =0;
        for (let i = 0; i < wallHeights.length; i++) {
            if(wallHeights[i] != 30){
                wallHeights[i]++;
                dailyConcrete+=195;
                build = true;
            }
        }

        if(build){
            totalConcrete.push(dailyConcrete);
        }else{
            break;
        }
    }

    let allConcrete = totalConcrete.reduce((a, b) => a+b);

    console.log(totalConcrete.join(', '));
    console.log(allConcrete* concretePrice + ' pesos')
}

//solution(['21', '25', '28'] );

//solution([17]);

//solution([17, 22, 17, 19, 17] );

solution([0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29,
    29]);