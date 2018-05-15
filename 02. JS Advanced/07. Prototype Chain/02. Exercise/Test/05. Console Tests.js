let expect = require('chai').expect;
let assert = require('chai').assert;

let Console = require('../05. C# Console.js').Console;

describe('Console tests', function () {
    it('Should return string, input is string', function () {
        expect(Console.writeLine('Ivan')).to.be.equal('Ivan');
    });
    it('should return stringify object, input is object', function () {
        let obj = { name: 'Pesho'};
        expect(Console.writeLine(obj)).to.be.equal(JSON.stringify(obj));
    });
    it('should return corect strings', function () {
        expect(Console.writeLine('{0}, {1}, {2}', 1, 2, 3)).to.be.equal('1, 2, 3');
    });
    it('should return TypeError if first string is incorect', function () {
        expect(() => {Console.writeLine([], 1, 2)}).to.throw(TypeError);
    });
    it('should return RangeError if pass more values than placeholders', function () {
        expect(() => {Console.writeLine('{0}', 1, 2)}).to.throw(RangeError);
    });
    it('should return RangeError if placeholder is with incorect number inside', function () {
        expect(() => {Console.writeLine('{13}', 1, 2, 3, 4, 5)}).to.throw(RangeError);
    });
});