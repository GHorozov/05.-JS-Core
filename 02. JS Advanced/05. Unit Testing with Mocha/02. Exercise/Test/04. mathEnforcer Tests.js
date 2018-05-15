let expect = require('chai').expect;
let assert = require('chai').assert;

let mathEnforcer = require('../04. Math Enforcer.js');

describe('MathEnforcer tests', function () {

    describe('addFive', function () {
        it('With non number parameter should return undefined, input is: test', function () {
            expect(mathEnforcer.addFive('test')).to.equal(undefined);
        });
        it('With number should return correct result 10, input is: 5', function () {
            expect(mathEnforcer.addFive(5)).to.equal(10);
        });
        it('With number should return correct result 4, input is: -1', function () {
            expect(mathEnforcer.addFive(-1)).to.equal(4);
        });
        it('With number should return correct result 6.1, input is: 1.1', function () {
            expect(mathEnforcer.addFive(1.1)).to.equal(1.1 + 5);
        });
    });

    describe('subtractTen', function () {
        it('With non number parameter should return undefined, input is: test', function () {
            expect(mathEnforcer.subtractTen('test')).to.equal(undefined);
        });
        it('With number should return correct result 10, input is: 20', function () {
            expect(mathEnforcer.subtractTen(20)).to.equal(10);
        });
        it('With number should return correct result 11, input is: -1', function () {
            expect(mathEnforcer.subtractTen(-1)).to.equal(-11);
        });
        it('With number should return correct result 0.2, input is: 10.2', function () {
            expect(mathEnforcer.subtractTen(10.2)).to.equal(10.2 - 10);
        });
    });

    describe('sum', function () {
        it('With non number parameter should return undefined, input is: test, 0', function () {
            expect(mathEnforcer.sum('test', 0)).to.equal(undefined);
        });
        it('With non number parameter should return undefined, input is: 1, test', function () {
            expect(mathEnforcer.sum(1, 'test')).to.equal(undefined);
        });
        it('With non number parameter should return 2, input is: 1, 1', function () {
            expect(mathEnforcer.sum(1, 1)).to.equal(2);
        });
        it('With non number parameter should return 0, input is: 1, -1', function () {
            expect(mathEnforcer.sum(1, -1)).to.equal(0);
        });
        it('With non number parameter should return 2.3, input is: 1.1, 1.2', function () {
            expect(mathEnforcer.sum(1.1, 1.2)).to.equal(1.1+1.2);
        });
    });
});