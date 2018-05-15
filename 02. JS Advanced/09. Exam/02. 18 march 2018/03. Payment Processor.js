class PaymentProcessor {
    constructor(option) {
        this.collection = [];
        this.option = option;
    }

    get option() {
        return this._option;
    }

    set option(newOption) {
        if (newOption === undefined) {
            this._option = {
                types: ["service", "product", "other"],
                precision: 2
            };
        }else {
            this._option = {};

            if (this._option.types === undefined) {
                this._option.types = ["service", "product", "other"];
            }
            if (this._option.precision === undefined) {
                this._option.precision = 2;
            }
            if (newOption.types !== undefined) {
                this._option.types = newOption.types;
            }

            if (newOption.precision !== undefined) {
                this._option.precision = newOption.precision;
            }
        }

    }


    registerPayment(id, name, type, value) {
        if (id.length === 0 || name.length === 0) {
            throw  new Error('Empty id or name.Try again.');
        }
        if (typeof value !== 'number') {
            console.log(typeof value == 'number');
            throw  new Error('Type must be a number.');
        }
        if (!this._option.types.includes(type)) {
            throw  new Error('Option not exist.');
        }
        if (this.collection.forEach(x => {
            if (x.id === id) {
                throw new Error('Id already exist.')
            }
        })) {
        }

        this.collection.push({
            id: id,
            name: name,
            type: type,
            value: Number(value)
        });

    }

    deletePayment(id) {
        let toDelete = '';
        this.collection.forEach(x => {
            if (x.id === id) {
                toDelete = x;
            }
        });

        if (toDelete === '') {
            throw new Error('Not found.');
        }

        this.collection = this.collection.filter(x => x.id !== id);
    }

    get(id) {
        let toDelete = '';
        this.collection.forEach(x => {
            if (x.id === id) {
                toDelete = x;
            }
        });

        if (toDelete === '') {
            throw new Error('Not found.');
        }

        return `Details about payment ID: ${toDelete.id}\n- Name: ${toDelete.name}\n- Type: ${toDelete.type}\n- Value: ${toDelete.value.toFixed(this.option.precision)}`
    }

    setOptions(options) {
        this.option = options;
    }

    toString() {
        let sum = 0;
        this.collection.forEach(x => {
            sum += x.value;
        });

        sum = sum.toFixed(this._option.precision);

        return `Summary:\n- Payments: ${this.collection.length}\n- Balance: ${sum}`;
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

// Should throw an error (ID not found)
//generalPayments.deletePayment('E027');
// Should throw an error (ID not found)
//generalPayments.get('E027');


generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
