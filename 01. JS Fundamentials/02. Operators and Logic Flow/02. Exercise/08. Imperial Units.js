function convertInchToFoot(inch) {
    let toFoot = Math.floor(inch / 12);
    let toInch = inch % 12;

    console.log(`${toFoot}'-${toInch}"`);
}

convertInchToFoot(55);