function sumByTowns(arr) {
    let obj ={};

    for (let i = 0; i < arr.length; i+=2) {
       if(obj.hasOwnProperty(arr[i])){
           obj[arr[i]] +=  Number(arr[i+1]);
       }
       else{
           obj[arr[i]] = Number(arr[i+1]);
       }
    }

    console.log(JSON.stringify(obj));
}

sumByTowns(['Sofia', 20, 'Varna', 3, 'Sofia', 5, 'Varna', 4]);

// sumByTowns('Sofia\n' +
//     '20\n' +
//     'Varna\n' +
//     '3\n' +
//     'sofia\n' +
//     '5\n' +
//     'varna\n' +
//     '4\n');