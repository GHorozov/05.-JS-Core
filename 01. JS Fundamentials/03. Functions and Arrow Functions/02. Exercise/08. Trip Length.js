function shortestPath(arr) {
    let x1 = arr[0];
    let y1 = arr[1];
    let x2 = arr[2];
    let y2 = arr[3];
    let x3 = arr[4];
    let y3 = arr[5];


    let firstSegment = getDistanceTwoPoints(x1,y1, x2,y2);
    let secondSegment = getDistanceTwoPoints(x2,y2, x3,y3);
    let thirdSegment = getDistanceTwoPoints(x1,y1, x3,y3);

    let startFirst = firstSegment + secondSegment;
    let startSecond = secondSegment + thirdSegment;
    let startThird = thirdSegment + firstSegment;

    if(startFirst <= startSecond && startFirst <= startThird){
        console.log(`1->2->3: ${startFirst}`);
    }
    else if(startSecond <= startThird){
        console.log(`1->3->2: ${startSecond}`);
    }
    else {
        console.log(`2->1->3: ${startThird}`);
    }

    function getDistanceTwoPoints(xOne, yOne, xTwo,yTwo) {
        let a= xOne - xTwo ;
        let b = yOne - yTwo;

        let c = Math.sqrt(a*a +b*b);

        return c;
    }
}

//shortestPath([0, 0, 2, 0, 4, 0]);
//shortestPath([5, 1, 1, 1, 5, 4]);
shortestPath([-1, -2, 3.5, 0, 0, 2]);