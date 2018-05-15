function convertGradDegrees(radians) {
    let radiansModule = radians % 400; // take reminder
    let degrees = radiansModule * 0.9 ; // make to degrees
    let result = degrees < 0 ? 360 + degrees : degrees; // check if negative 360 + degrees

    console.log(result);
}

convertGradDegrees(-50);