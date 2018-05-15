function assignProperties(params) {
    var obj = {};

    if(params.length <= 1){
        return obj;
    }

    for (i = 0; i < params.length - 1; i++) {
        obj[params[i++]] = params[i];
    }

    return obj;
}

console.log(assignProperties(['name', 'Pesho', 'age', '23', 'gender', 'male']));
console.log(assignProperties(['ssid', '90127461', 'status', 'admin', 'expires', '600']));
