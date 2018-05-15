function calcDistance(coordinates) {
    //var a = x1 - x2
    //var b = y1 - y2
    //var c = Math.sqrt( a*a + b*b );

    let a = coordinates[0] - coordinates[3];
    let b = coordinates[1] - coordinates[4];
    let z = coordinates[2] - coordinates[5];
    let c = Math.sqrt(a*a + b*b + z*z);

    console.log(c);
}

calcDistance([3.5, 0, 1, 0, 2, -1]);