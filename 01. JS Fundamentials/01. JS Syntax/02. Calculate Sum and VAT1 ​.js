function calcSum(numbers) {
    let sum =0
    for (var i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }

    console.log("sum " + sum)
    console.log("VAT " + sum* 0.2)
    console.log("total " + sum*1.2)
}


