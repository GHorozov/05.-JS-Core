function roadRadar(arr) {
    let speed = arr[0];
    let place = arr[1].toLowerCase();

    let speedLimit = getLimits(place);

    if(speed > speedLimit){
        console.log(getPanalty(speed, speedLimit));
    }

    function getPanalty(speed, speedLimit) {
        let diff = speed - speedLimit;

        return diff <= 0 ? ''
            : diff <= 20 ? 'speeding'
                : diff <= 40 ? 'excessive speeding'
                    : 'reckless driving'
    }

    function getLimits(place) {

        switch(place){
            case "motorway": return 130;
            case "interstate": return 90;
            case "city": return 50;
            case "residential": return 20;
        }
    }
}

roadRadar([40, 'city']);
roadRadar([21, 'residential']);
roadRadar([120, 'interstate']);
roadRadar([200, 'motorway']);

//second way
// function speedCheck(params) {
//     let diff = getAllowanceDiff();
//
//     return diff <= 0 ? ''
//         : diff <= 20 ? 'speeding'
//             : diff <= 40 ? 'excessive speeding'
//                 : 'reckless driving'
//
//     function getAllowanceDiff() {
//         let currentSpeed = params[0];
//         let area = params[1].toLowerCase();
//
//         let allowances = {
//             motorway: 130,
//             interstate: 90,
//             city: 50,
//             residential: 20
//         }
//
//         return currentSpeed - allowances[area];
//     }
// }