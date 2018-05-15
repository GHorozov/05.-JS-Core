let expect = require('chai').expect;
let assert = require('chai').assert;

let lookupChar = require('../03. Char Lookup');

describe('LookupChar tests', function () {
    //undefined
    it('Should return undefined input is: 12', function () {
        expect(lookupChar(12)).to.be.undefined;
    });
    it('Should return undefined input is: 12, 0', function () {
        expect(lookupChar(12, 0)).to.be.undefined;
    });
    it('Should return undefined input is: 12, test', function () {
        expect(lookupChar(12, 'test')).to.equal(undefined);
    });
    it('Should return undefined input is: pesho, gosho', function () {
        expect(lookupChar("pesho", "gosho")).to.equal(undefined);
    });
    it('Should return undefined input is: test, 3.14', function () {
        expect(lookupChar('test', 3.14)).to.equal(undefined);
    });
    it('Should return undefined input is: test, undefined', function () {
        expect(lookupChar('test', undefined)).to.be.undefined;
    });

    //indexes
    it('Should return Incorrect index, input is: test, -1 ', function () {
        expect(lookupChar('test', -1)).to.equal('Incorrect index');
    });
    it('Should return Incorrect index, input is: test, 4 ', function () {
        expect(lookupChar('test', 4)).to.equal('Incorrect index');
    });
    it('Should return Incorrect index, input is: test, 10 ', function () {
        expect(lookupChar('test', 10)).to.equal('Incorrect index');
    });

    //correct
    it('Should return Incorrect index, input is: test, 1 ', function () {
        expect(lookupChar('test', 1)).to.be.equal('e');
    });
    it('Should return Incorrect index, input is: Georgi, 0 ', function () {
        expect(lookupChar('Georgi', 0)).to.equal('G');
    });
});