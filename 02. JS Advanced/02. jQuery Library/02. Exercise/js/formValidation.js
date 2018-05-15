function validate(){
    let regexUsername = /^[A-Za-z0-9]{3,20}$/gm;
    let regexEmail = /^(.)*@(.)*\.(.)*$/g;
    let regexPassword = /^[A-Za-z0-9_]{5,15}$/g;

    //checkBox
    let isCompanyNumberValid = true;
    let isCheckedBox = false;
    $('#company').on('change', function () {
        if ($('#company').prop('checked') == true) {
            isCheckedBox = true;
            $('#companyInfo').css('display', 'inline');
        } else {
            $('#companyInfo').css('display', 'none')
        }
    });

    //Submit
    $('#submit').on('click', function (ev) {
        ev.preventDefault();

        let usernameInput = $('#username').val();
        let emailInput = $('#email').val();
        let passwordInput = $('#password').val();
        let confirmPasswordInput = $('#confirm-password').val();

        let isValidUsername = regexUsername.test(usernameInput);
        let isValidEmail = regexEmail.test(emailInput);
        let isValidPassword = regexPassword.test(passwordInput);
        let isPasswordConfirmed = (passwordInput === confirmPasswordInput);


        //username
        if(!isValidUsername){
            $('#username').css('border-color', 'red')
        }

        //email
        if(!isValidEmail){
            $('#email').css('border-color', 'red')
        }

        //password
        if(!isValidPassword){
            $('#password').css('border-color', 'red')
        }

        //confirmedPassword
        if(!isPasswordConfirmed){
            $('#confirm-password').css('border-color', 'red')
        }

        //checkBoxCheck
        let companyNumberInput = $('#companyNumber').val();
        if(companyNumberInput < 1000 || companyNumberInput > 9999){
            $('#companyNumber').css('border-color', 'red')
            isCompanyNumberValid = false;
        }

        if(isValidUsername && isValidEmail && isValidPassword && isPasswordConfirmed){
           if(isCheckedBox){
                if(isCompanyNumberValid){
                    $('#valid').css('display', 'inherit');
                }else{
                    $('#valid').css('display', 'none');
                }
           }else{
               $('#valid').css('display', 'inherit');
           }
        }
    });
}
