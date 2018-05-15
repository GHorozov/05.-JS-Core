function modifyNumber(n) {
    let avg = getAvg(n);

    if(avg > 5){
        console.log(n);
    }
    else {
        n += '9';
        modifyNumber(n);
    }

    function getAvg(n) {
         n = n.toString();

        let sum = 0;
        for (let i = 0; i < n.length; i++) {
            sum += Number(n[i]);
        }

        return sum / n.length;
    }
}

modifyNumber(101);
modifyNumber(5835);