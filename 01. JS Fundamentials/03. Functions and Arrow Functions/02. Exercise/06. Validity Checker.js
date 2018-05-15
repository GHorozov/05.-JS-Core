function checkDistancePoints(arr) {
    let x1 = arr[0];
    let y1 = arr[1];
    let x2 = arr[2];
    let y2 = arr[3];

    let firstCheck = getDistanceTwoPoints(x1, y1, 0, 0);
    let secondCheck = getDistanceTwoPoints(x2, y2, 0, 0);
    let thirdCheck = getDistanceTwoPoints(x1, y1, x2, y2);

    console.log(isValid(firstCheck) ? `{${x1}, ${y1}} to {0, 0} is valid` : `{${x1}, ${y1}} to {0, 0} is invalid`);
    console.log(isValid(secondCheck) ?`{${x2}, ${y2}} to {0, 0} is valid` : `{${x2}, ${y2}} to {0, 0} is invalid`);
    console.log(isValid(thirdCheck) ? `{${x1}, ${y1}} to {${x2}, ${y2}} is valid` : `{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);


    function isValid(number) {
        if(Number.isInteger(number)){
            return true;
        }

        return false;
    }

    function getDistanceTwoPoints(x1, y1, x2,y2) {
        let a= x1 - x2 ;
        let b = y1 - y2;

        let c = Math.sqrt(a*a +b*b);

        return c;
    }
}

//checkDistancePoints([3, 0, 0, 4]);
checkDistancePoints([2, 1, 1, 1]);