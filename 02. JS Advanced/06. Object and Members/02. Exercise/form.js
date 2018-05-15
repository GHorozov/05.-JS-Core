(function() {
    class Textbox {
        constructor(selector, regex){
            this.selector = selector;
            this._invalidSymbols = regex;
            this._elements = $(this.selector);
            $(this._elements).on('input', (e) => {
                this._value = $(e.target).val();
                for (let element of this._elements) {
                    this.updateElements();
                }
            })
        }

        updateElements(){
            for (let element of this._elements) {
                $(element).val(this._value);
            }
        }

        get value(){
            return this._value;
        }

        set value(newValue){
            this._value= newValue;
            this.updateElements();
        }

        get elements(){
            return this._elements;
        }

        isValid(){
            if(this._invalidSymbols.test(this.value)){
                return false;
            }

            return true;
        }
    }

    class Form{
        constructor(...textboxes){
            if(textboxes.some(t => !(t instanceof Textbox))){
                throw new Error("Some of the constructor arguments are not a Textbox");
            } else {
                this._textboxes = textboxes;
                this._element = $('<div>').addClass('form');
                for(let textbox of textboxes){
                    this._element.append($(textbox.selector));
                }
            }
        }

        submit(){
            let allValid = true;
            for(let textbox of this._textboxes){
                if(textbox.isValid()){
                    $(textbox.selector).css('border', '2px solid green');
                } else {
                    $(textbox.selector).css('border', '2px solid red');
                    allValid = false;
                }
            }
            return allValid;
        }

        attach(selector){
            $(selector).append($(this._element));
        }
    }

    return {Textbox, Form};
}());

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username,password);
form.attach("#root");
