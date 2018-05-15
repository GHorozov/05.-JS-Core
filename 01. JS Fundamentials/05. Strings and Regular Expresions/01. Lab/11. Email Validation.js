function emailValidator(email) {
    let pattern = /^[A-Za-z0-9]+@[a-z]+\.[a-z]+$/g;

    if(pattern.test(email)){
        console.log('Valid')
    }else {
        console.log('Invalid')
    }
}

emailValidator('asa@abv.bg');
emailValidator('_asd@abv.bg')