function thePyramidOfKing(base, increment) {
    let pyramidHeight = Math.ceil(base/2);

    let stone = 0;
    let marble = 0;
    let lapus = 0;

    for (let i = 1; i <= pyramidHeight-1; i++) {
        let currentStone = ((base-2)*(base-2));

        if(i % 5 === 0){
            lapus += base*base - currentStone;
        }else {
            marble += base*base - currentStone;
        }
        stone += currentStone;
        base-=2;
    }
    let gold = Math.ceil(base*base * increment);
    let finalPyramidHeight = Math.floor(pyramidHeight*increment);

    console.log(`Stone required: ${Math.ceil(stone*increment)}`);
    console.log(`Marble required: ${Math.ceil(marble*increment)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapus*increment)}`);
    console.log(`Gold required: ${gold}`);
    console.log(`Final pyramid height: ${finalPyramidHeight}`);
}

thePyramidOfKing(11, 1);

//thePyramidOfKing(11, 0.75);

//thePyramidOfKing(12, 1);

//thePyramidOfKing(23, 0.5)