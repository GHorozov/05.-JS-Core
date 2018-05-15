function solution(obj) {
    const RequiredAmountPerKg = 0.1;
    if(obj.handsShaking === true){
        let alcoholToDrink = obj.experience * RequiredAmountPerKg * obj.weight;
        obj.bloodAlcoholLevel = obj.bloodAlcoholLevel + alcoholToDrink;
        obj.handsShaking = false;
    }

    return obj;
}


console.log(solution(
    {
        weight: 80,
        experience: 1,
        bloodAlcoholLevel: 0,
        handsShaking: true
    }
));

solution(
    { weight: 120,
    experience: 20,
    bloodAlcoholLevel: 200,
    handsShaking: true }
);

solution(
    { weight: 95,
        experience: 3,
        bloodAlcoholLevel: 0,
        handsShaking: false }
);
