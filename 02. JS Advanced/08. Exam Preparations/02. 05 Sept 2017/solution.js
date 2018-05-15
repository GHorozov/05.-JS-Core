class Dialog {
    constructor(textMessage, callback) {
        this.textMessage = textMessage;
        this.callback = callback;
        this.inputs = [];
        this.element = null;
    }

    addInput(label, name, type) {
        this.inputs.push({label, name, type});
    }

    render() {
        this.element = $('<div class="overlay">');
        let dialogDiv = $('<div class="dialog">');
        dialogDiv.append($(`<p>${this.textMessage}</p>`));
        for (let obj of this.inputs) {
            dialogDiv.append($(`<label>${obj.label}</label>`));
            dialogDiv.append($(`<input name="${obj.name}" type="${obj.type}">`));
        }
        dialogDiv.append($('<button>OK</button>').on('click', this._funcOk.bind(this)));
        dialogDiv.append($('<button>Cancel</button>').on('click', this._funcCancel.bind(this)));
        this.element.append(dialogDiv);
        $('body').append(this.element);
    }

    _funcOk(){
        let obj = {};
        let allInputs = $(this.element).find('input').toArray();
        //allInputs.forEach(x => obj[$(x).attr('name')] = $(x).val());
        for (let inp of allInputs) {
            obj[$(inp).attr('name')] = $(inp).val();
        }
        this.callback(obj);
        this._funcCancel();
    }

    _funcCancel(){
        $(this.element).remove(); //First bind this above to pass current class Dialog this
    }
}