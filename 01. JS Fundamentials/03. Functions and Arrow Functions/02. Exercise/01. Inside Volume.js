function calcInsideVolume(arr) {
    let x1 =10, x2 = 50;
    let y1 =20, y2 = 80;
    let z1 =15, z2 = 50;

    for (let i = 0; i < arr.length; i+= 3) {
        let x = arr[i];
        let y = arr[i+1];
        let z = arr[i+2];

        let result = ((x >= x1 && x <= x2) && (y >= y1 && y <= y2) && (z >= z1 && z <= z2)) ? 'inside' : 'outside';
        console.log(result);
    }
}

//calcInsideVolume([8, 20, 22]);
calcInsideVolume([13.1, 50, 31.5, 50, 80, 50, -5, 18, 43]);
