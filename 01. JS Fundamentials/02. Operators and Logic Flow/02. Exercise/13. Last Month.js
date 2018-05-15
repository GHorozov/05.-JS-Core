function takeLastMonthDate(params) {
    let day = params[0];
    let month = params[1];
    let year = params[2];

    let date = new Date(`${month} ${1}  ${year}`); // 1 in days is equal to day params from input
    date.setDate(date.getDate() - 1);

    return date.getDate();
}

console.log(takeLastMonthDate([17, 3, 2002]));
console.log(takeLastMonthDate([13, 12, 2004]));