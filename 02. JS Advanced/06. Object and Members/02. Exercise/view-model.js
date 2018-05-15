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

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input',function(){console.log(textbox.value);});
