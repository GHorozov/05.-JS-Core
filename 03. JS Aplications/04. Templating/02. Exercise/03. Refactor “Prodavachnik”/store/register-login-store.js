(function () {
    class Form{
        constructor(id){
            this.id = id;
        }
    }

    let registerForm = [
        new Form('viewRegister'),
    ];

    let loginForm =[
        new Form('viewLogin'),
    ];


    window.applicationCache ={
        registerForm,
        loginForm
    }
}());