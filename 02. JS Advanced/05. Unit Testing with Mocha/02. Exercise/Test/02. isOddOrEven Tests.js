let expect = require('chai').expect;
let should = require('chai').should;
let assert = require('chai').assert;
let isOddOrEven = require('../02. Even Or Odd').isOddOrEven;

describe('OddOrEven tests', function () {
    it('Should return "even" test', function () {
        expect(isOddOrEven('test')).to.equal('even');
    });
    it('Should return "odd" input is pesho', function () {
        expect(isOddOrEven('pesho')).to.equal('odd');
    });
    it('Should return undefined input is 6', function () {
        expect(isOddOrEven(6)).to.undefined;
    });

    //with assert
    it('with an even length string should return "even"', function () {
        assert.equal(isOddOrEven("roar"), "even", "Function did not return correct result!");
    });

    //with should
    // it('with a object parameter, should return undefined', function () {
    //     isOddOrEven({name:'pesho'}).should.equal(undefined);
    // });
});