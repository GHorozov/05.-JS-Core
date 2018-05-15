class PaymentProcessor {
    constructor(option){
        this.processor = [];
        this.option = option;
    }

    get option(){
        return this._option;
    }
    set option(value){
        if(value === undefined){
            this._option = {types: ["service", "product", "other"], precision: 2};
        }else{
            if(value.hasOwnProperty('types')){
                this._option = {types: ["service", "product", "other"], precision: 2};
            }
            if(value.hasOwnProperty('precision')) {
                this._option = {types: ["service", "product", "other"], precision: value.precision};
            }
        }
    }

    registerPayment(id, name, type, value){
        if(id.length === 0 || name.length === 0){
            throw new Error('invalid type');
        }
        if(!(this._isInt(value) || this._isFloat(value))){
            throw new Error('invalid value prop');
        }

        if(!this.option.types.includes(type)){
             throw new Error('invalid option type');
        }

        if(this.processor.filter(x => x.id === id).length > 0){
            throw new Error('id exist');
        }

        this.processor.push({id, name, type, value});
    }

    deletePayment(id){
        let foundId = this.processor.filter(x => x.id === id);
        if(foundId.length === 0){
            throw new Error('id not exist');
        }
        for (let i = 0; i < this.processor.length; i++) {
            if(this.processor[i].id === id){
                this.processor.splice(i, 1);
            }
        }
    }

    get(id){
        let foundId = this.processor.filter(x => x.id === id);
        if(foundId.length === 0){
            throw new Error('id not found');
        }

         let o =  this.processor.filter(x => x.id === id);

        let result = `Details about payment ID: ${id}\n`;
        result += `- Name: ${o[0]['name']}\n`;
        result += `- Type: ${o[0]['type']}\n`;
        result += `- Value: ${o[0]['value'].toFixed(2)}`;

        return result;
    }

    setOptions(options){

        if(options.hasOwnProperty('types')){
            this.option.types = options.types;
        }else if(options.hasOwnProperty('precision')) {
            this.option.precision = options.precision;
        }
    }

    toString(){
        let result = 'Summary:\n';
        result += `- Payments: ${this.processor.length}\n`;
        let sum = 0;
        for (let p of this.processor) {
            sum += p.value;
        }
        let pres = this.option.precision;
        result += `- Balance: ${sum.toFixed(pres)}`;
        return result;
    }

    _isInt(n){
        return Number(n) === n && n % 1 === 0;
    }

    _isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }
}


// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

// Should throw an error (invalid type)
//generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);

generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

// // Should throw an error (ID not found)
//generalPayments.deletePayment('E027');
// Should throw an error (ID not found)
//generalPayments.get('E027');
//
generalPayments.deletePayment('E028');
console.log(generalPayments.toString());
//
// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
