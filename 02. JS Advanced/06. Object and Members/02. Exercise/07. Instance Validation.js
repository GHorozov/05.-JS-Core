class CheckingAccount{
    constructor(clientId, email, firstName, lastName ){
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.products = [];
    }

    get clientId(){
       return this._clientId;
    }

    set clientId(newCliendId){
        if(typeof newCliendId !== 'string'){
            throw new TypeError('Client ID must be a 6-digit number');
        }

        let regex = /^\d{6}$/g;
        if(!regex.test(newCliendId)){
            throw new TypeError('Client ID must be a 6-digit number');
        }

        this._clientId = newCliendId;
    }

    get email(){
        return this._email;
    }

    set email(newEmail){
        let regex =/^[A-Za-z]+@[A-Za-z.]+$/g;
        if(!regex.test(newEmail)){
            throw new TypeError('Invalid e-mail');
        }
        this._email = newEmail;
    }

    get firstName(){
        return this._firstName;
    }

    set firstName(newFirstName){
        if(newFirstName.length < 3 || newFirstName > 20) {
            throw new TypeError('First name must be between 3 and 20 characters long')
        }

        let regex = /^[A-Za-z]{3,20}$/g;
        if(!regex.test(newFirstName)){
            throw new TypeError('First name must contain only Latin characters')
        }
        this._firstName = newFirstName;
    }

    get lastName(){
        return this._lastName;
    }

    set lastName(newLastName){
        if(newLastName.length < 3 || newLastName > 20) {
            throw new TypeError('Last name must be between 3 and 20 characters long')
        }

        let regex = /^[A-Za-z]{3,20}$/g;
        if(!regex.test(newLastName)){
            throw new TypeError('Last name must contain only Latin characters')
        }

        this._lastName = newLastName;
    }
}

let acc = new CheckingAccount('4234145', 'petkan@another.co.uk', 'Petkan', 'Draganov');

//let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov'); //TypeError: Client ID must be a 6-digit number


//let acc = new CheckingAccount('131455', 'ivan@', 'Ivan', 'Petrov'); //TypeError: Invalid e-mail


//let acc = new CheckingAccount('131455', 'ivan@some.com', 'I', 'Petrov'); //TypeError: First name must be between 3 and 20 characters long


//let acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov'); //TypeError: "First name must contain only Latin characters