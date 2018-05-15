const jsdom = require('jsdom-global')();
const $ = require('jquery');
const expect = require('chai').expect;

const sharedObject = require('../05. Shared Object.js').sharedObject;

describe('SharedObject tests', function () {
    beforeEach('init HTML', function () {
        document.body.innerHTML =
            `<div id="wrapper">
                 <input type="text" id="name">
                 <input type="text" id="income">
            </div>`;
    });

    //name and income equal null
    it('shareObject property name should return null', function () {
        expect(sharedObject.name).to.be.null;
    });
    it('shareObject property income should return null', function () {
        expect(sharedObject.income).to.be.null;
    });

    //change name
    it('shareObject changeName pass empty string name should not be changed', function () {
        sharedObject.changeName('');
        expect(sharedObject.name).to.be.equal(sharedObject.name);
    });
    it('shareObject changeName pass number name should be changed with number', function () {
        sharedObject.changeName(15);
        expect(sharedObject.name).to.equal(15);
        expect($('#name').val()).to.equal('15');
    });
    it('shareObject changeName pass correct name should be changed with correct name', function () {
        sharedObject.changeName("Pesho");
        sharedObject.changeName("Gosho");
        expect(sharedObject.name).to.equal("Gosho");
    });


    //change income
    it('shareObject changeIncome pass negative number, name should not be changed', function () {
        sharedObject.changeIncome(-1);
        expect(sharedObject.income).to.equal(sharedObject.income);
    });
    it('shareObject changeIncome pass negative number, name should not be changed', function () {
        let oldValue = sharedObject.income;
        sharedObject.changeIncome('abc');
        expect(oldValue).to.equal(sharedObject.income);
    });
    it('shareObject changeIncome pass negative number, name should not be changed', function () {
        let oldValue = sharedObject.income;
        sharedObject.changeIncome(3.14);
        expect(oldValue).to.equal(sharedObject.income);
    });
    it('shareObject changeIncome pass negative number, name should not be changed', function () {
        let oldValue = sharedObject.income;
        sharedObject.changeIncome(0);
        expect(oldValue).to.equal(sharedObject.income);
    });
    it('shareObject changeIncome pass positive number, name should be changed with number', function () {
        sharedObject.changeIncome(10);
        expect(sharedObject.income).to.equal(10);
        expect($('#income').val()).to.equal('10');
    });

    //update name
    it('shareObject updateName pass empty string name should not be changed', function () {
        sharedObject.changeName("Pesho");
        $("#name").val('');
        sharedObject.updateName('');
        expect(sharedObject.name).to.equal("Pesho");
        expect($("#name").val()).to.equal('');
    });
    it('shareObject updateName pass string name should be changed with string', function () {
        $('#name').val('Georgi');
        sharedObject.updateName('Georgi');
        expect(sharedObject.name).to.be.equal('Georgi');
    });

    //update income
    it('shareObject updateIncome pass number that cannot be parsed to positive number income should not be changed', function () {
        sharedObject.changeIncome(10);
        $('#income').val('abc');
        sharedObject.updateIncome('abc');
        expect(sharedObject.income).to.be.equal(10);
    });
    it('shareObject updateIncome pass number that cannot be parsed to positive number income should not be changed', function () {
        sharedObject.changeIncome(10);
        let oldValue = sharedObject.income;
        $('#income').val(0);
        sharedObject.updateIncome(0);
        expect(oldValue).to.be.equal(10);
    });
    it('shareObject updateIncome pass number that cannot be parsed to positive number income should not be changed', function () {
        sharedObject.changeIncome(10);
        $('#income').val(NaN);
        sharedObject.updateIncome(NaN);
        expect(sharedObject.income).to.be.equal(10);
    });
    it('shareObject updateIncome pass number that cannot be parsed to positive number income should not be changed', function () {
        sharedObject.changeIncome(10);
        $('#income').val(-1);
        sharedObject.updateIncome(-1);
        expect(sharedObject.income).to.be.equal(10);
    });
    it('shareObject updateIncome pass number should be changed with number', function () {
        sharedObject.changeIncome(15);
        $("#income").val(0);
        sharedObject.updateIncome();
        expect(sharedObject.income).to.equal(15);
    });
    it('shareObject updateIncome pass number that cannot be parsed to positive number income should not be changed', function () {
        sharedObject.changeIncome(10);
        $('#income').val(0);
        sharedObject.updateIncome(0);
        expect(sharedObject.income).to.be.equal(10);
    });
    it('shareObject updateIncome pass undefined income should not be changed', function () {
        sharedObject.changeIncome(10);
        $('#income').val(undefined);
        sharedObject.updateIncome(undefined);
        expect(sharedObject.income).to.be.equal(10);
    });
    it('shareObject updateIncome pass number income should be changed', function () {
        sharedObject.changeIncome(15);
        $("#income").val("0");
        sharedObject.updateIncome();
        expect(sharedObject.income).to.equal(15);

    });
});

