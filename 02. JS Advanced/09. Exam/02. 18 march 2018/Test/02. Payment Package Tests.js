const expect = require('chai').expect;
const PaymentPackage = require('../02. Payment Package.js');

describe("Tests", function() {
    let pp;
    beforeEach(function () {
        pp = new PaymentPackage('Ivan', 20);
    });

    it("should create an instance with correct properties for ('testP, 50')", function name() {
        let p = new PaymentPackage("testP", 50);

        expect(p.hasOwnProperty("_name")).to.be.true;
        expect(p.hasOwnProperty("_value")).to.be.true;
        expect(p.hasOwnProperty("_VAT")).to.be.true;
        expect(p.hasOwnProperty("_active")).to.be.true;
    });

    it("If there method toString", function() {
        expect(PaymentPackage.prototype.hasOwnProperty('toString')).to.be.equal(true);
    });
    it("Is there property name", function() {
        expect(PaymentPackage.hasOwnProperty('name')).to.be.equal(true);
    });
    it("Are there properties name and value", function() {
        expect(PaymentPackage.hasOwnProperty('name', 'value')).to.be.equal(true);
    });

    it("Input empty string name to throw Error", function() {
        expect(() => {new PaymentPackage('', 20)}).to.throw(Error);
    });
    it("Input empty string value to throw Error", function() {
        expect(() => {new PaymentPackage('name', '')}).to.throw(Error);
    });


    //get name
    it("To get name", function() {
        expect(pp.name).to.be.equal('Ivan');
    });

    //set name
    it("Input empty string name to throw Error", function() {
        expect(() => {new PaymentPackage('', 20)}).to.throw(Error);
    });
    it("Input number name to throw Error", function() {
        expect(() => {new PaymentPackage(5, 20)}).to.throw(Error);
    });
    it("", function() {
        let obj = new PaymentPackage('Georgi', 20);
        expect(obj.name).to.be.equal('Georgi');
    });

    //get value
    it("To get value", function() {
        expect(pp.value).to.be.equal(20);
    });
    it("Input string value to throw Error", function() {
        expect(() => {new PaymentPackage('test', 'ne6to')}).to.throw(Error);
    });
    it("Input negative number value to throw Error", function() {
        expect(() => {new PaymentPackage('test', -1)}).to.throw(Error);
    });
    it("", function() {
        let obj = new PaymentPackage('Georgi', 0);
        expect(obj.value).to.be.equal(0);
    });
    it("", function() {
        let obj = new PaymentPackage('Georgi', 0.2);
        expect(obj.value).to.be.equal(0.2);
    });

    //get VAT
    it("To get VAT", function() {
        expect(pp.VAT).to.be.equal(20);
    });

    //set Vat
    it("If is string VAT to throw Error", function() {
        expect(() => {new PaymentPackage('test', 'ne6to')}).to.throw(Error);
    });
    it("If is string VAT to throw Error", function() {
        expect(() => {new PaymentPackage('test', -1)}).to.throw(Error);
    });
    it("VAT to be number type", function() {
        expect(typeof pp.VAT).to.be.equal('number');
    });
    it("VAT > 0", function() {
        expect(pp.VAT > 0).to.be.equal(true);
    });

    //get active
    it("To get active", function() {
        expect(pp.active).to.be.equal(true);
    });

    //set active
    it("To get active", function() {
        expect(typeof pp.active).to.be.equal('boolean');
    });

    //toString
    it('to string to return correct result', function () {
        expect(pp.toString()).to.be.equal('Package: Ivan\n' +
            '- Value (excl. VAT): 20\n' +
            '- Value (VAT 20%): 24');
    });

});
