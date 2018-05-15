function solution(input) {
    let yield = Number(input);
    let limit = 100;

    let days= 0;
    let totalYield = 0;
    let crewConcumption = 26;
    let finalConcumption =26;

    if(yield < limit){
        console.log(days);
        console.log(totalYield);
        return;
    }

    while(yield >= limit){
        totalYield += (yield - crewConcumption);
        yield -= 10;
        days++;
    }

    if(totalYield > finalConcumption) {
        totalYield -= finalConcumption;
    }

    console.log(days);
    console.log(totalYield);
}

solution(-20);

//solution('111');

//solution('450');

//solution('200');