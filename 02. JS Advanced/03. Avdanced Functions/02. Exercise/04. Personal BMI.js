function calcPatienCondition(name, age, weight, height) {
    let obj = {
        name: name,
        personalInfo: {
            age: age,
            weight: weight,
            height: height
        },
        BMI: (function () {
            return Math.round(((weight / (height / 100)) / (height / 100)));
        }())
    };

    let bmi = obj.BMI;
    if (bmi < 18.5) {
        obj.status = 'underweight';
    } else if (bmi < 25) {
        obj.status = 'normal';
    } else if (bmi < 30) {
        obj.status = 'overweight';
    } else if (bmi >= 30) {
        obj.status = 'obese';
        obj.recommendation = 'admission required';
    }

    return obj;
}

calcPatienCondition("Georgi", 31, 100, 180);
//calcPatienCondition("Peter", 29, 75, 182);