function dayOfWeekInNumber(word) {
    let weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday", "Sunday"];

    let index = weekDays.indexOf(word);
    return  index > -1 ? index + 1 : "error";
}

console.log(dayOfWeekInNumber(2));