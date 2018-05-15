function usernames(arr) {
    let emails = [];
    let list = [];
    for (let i = 0; i < arr.length; i++) {
        let email = arr[i];
        let result = '';
        let aIndex =  email.indexOf('@');
        result += email.substr(0, aIndex);
        result += '.';
        result += email.substr(aIndex+1,  1);

        let startIndex = aIndex + 1;
        email = email.substr(aIndex);
        while(true){
            let dotIndex = email.indexOf('.');
            if(dotIndex < 0){
                break;
            }

            result += email.substr(dotIndex+1, 1);
            email = email.substr(dotIndex+1);
        }

        list.push(result);
    }

    console.log(list.join(', '));
}

usernames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);