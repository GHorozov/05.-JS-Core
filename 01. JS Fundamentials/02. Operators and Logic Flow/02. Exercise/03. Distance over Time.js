function calcDistance(numbers) {
    let v1 = numbers[0];
    let v2 = numbers[1];
    let time = numbers[2] / 3600;
    let dist1 = (v1 * time) * 1000;
    let dist2 = (v2 * time) * 1000;

    let delta = Math.abs(dist1 - dist2);

    console.log(delta);
}

calcDistance([11, 10, 120]);
