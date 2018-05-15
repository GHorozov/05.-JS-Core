let expect = require('chai').expect;
let createCalculator =require('../07. AddSubtract.js');

describe('AddSubtract tests', function () {
    //Arrange
    let calc;
    beforeEach(function () {
        calc = createCalculator();
    });

    //Assert
    it("Should return 0", function () {
        expect(calc.get()).to.be.equal(0);
    });
    it("Should return 10", function () {
        calc.add(10);
        expect(calc.get()).to.be.equal(10);
    });
    it("Should return -10", function () {
        calc.subtract(10);
        expect(calc.get()).to.be.equal(-10);
    });
    it("Should return 7 after add 10, subtract 5, add 5 subtract 3", function () {
        calc.add(10);
        calc.subtract(5);
        calc.add(5);
        calc.subtract(3);
        expect(calc.get()).to.be.equal(7);
    });
    it("Should return -8 after subtract 5, subtract 3", function () {
        calc.subtract(5);
        calc.subtract(3);
        expect(calc.get()).to.be.equal(-8);
    });
    it("Should return 5 after add 2, add 3", function () {
        calc.add(2);
        calc.add(3);
        expect(calc.get()).to.be.equal(5);
    });
    it("Should return 2 after add 5, subtract 3", function () {
        calc.add(5);
        calc.subtract(3);
        expect(calc.get()).to.be.equal(2);
    });
    it("Should return 2 after add 5.1, subtract 3.1", function () {
        calc.add(5.1);
        calc.subtract(3.1);
        expect(calc.get()).to.be.equal(5.1 - 3.1);
    });
    it("Should return NaN", function () {
        calc.add(undefined);
        expect(calc.get()).to.be.NaN;
    });
    it("Should return NaN", function () {
        calc.subtract('test');
        expect(calc.get()).to.be.NaN;
    });
    it("Should return NaN", function () {
        calc.add('test');
        expect(calc.get()).to.be.NaN;
    });
    it("should return 2 after add(10); subtract('7'); add('-2'); subtract(-1)", function () {
        calc.add(10);
        calc.subtract('7');
        calc.add('-2');
        calc.subtract(-1);
        let value = calc.get();
        expect(value).to.be.equal(2);
    });
});