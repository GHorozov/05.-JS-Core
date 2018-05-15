let expect = require('chai').expect;
const StringBuilder = require('../02. String Builder');

describe('String Builder tests', function () {

    let stringBuilder;
    beforeEach(function () {
        stringBuilder = new StringBuilder('test');
    });

    describe('Class structure tests', function () {
        it('To throw error', function () {
            expect(() => {new StringBuilder(5)}).to.throw(TypeError); //must be in arrow function to throw error
        });
        it('Array lenght should be 4', function () {
            expect(stringBuilder._stringArray.length).to.equal(4);
        });
        it('Array should not be undefined', function () {
            expect(stringBuilder._stringArray !== undefined).to.equal(true);
        });
        it('To has func append', function () {
            expect(StringBuilder.prototype.hasOwnProperty('append')).to.be.equal(true);
        });
        it('To has func prepend', function () {
            expect(StringBuilder.prototype.hasOwnProperty('prepend')).to.be.equal(true);
        });
        it('To has func insertAt', function () {
            expect(StringBuilder.prototype.hasOwnProperty('insertAt')).to.be.equal(true);
        });
        it('To has func remove', function () {
            expect(StringBuilder.prototype.hasOwnProperty('remove')).to.be.equal(true);
        });
        it('To has func toString', function () {
            expect(StringBuilder.prototype.hasOwnProperty('toString')).to.be.equal(true);
        });
    });

    describe('Append tests', function () {
        it('Array should throw error', function () {
            expect(() => {stringBuilder.append({})}).to.be.throw(TypeError);
        });
        it('Array should append string to the end', function () {
            stringBuilder.append(' append');
            expect(stringBuilder.toString()).to.be.equal('test append');
        });
    });

    describe('Prepend tests', function () {
        it('Array should throw error', function () {
            expect(() => {stringBuilder.prepend(1)}).to.be.throw(TypeError);
        });
        it('Array should append string to the end', function () {
            stringBuilder.prepend('a ');
            expect(stringBuilder.toString()).to.be.equal('a test');
        });
    });

    describe('InsertAt tests', function () {
        it('Array should throw error', function () {
            expect(() => stringBuilder.insertAt([], 2)).to.be.throw(TypeError);
        });
        it('Array should append string to the end', function () {
            stringBuilder.insertAt('a', 1);
            expect(stringBuilder.toString()).to.be.equal('taest');
        });
    });

    describe('Remove tests', function () {
        it('Array should append string to the end', function () {
            stringBuilder.remove(1, 2);
            expect(stringBuilder.toString()).to.be.equal('tt');
        });
    });

    describe('ToString func tests', function () {
        it('Should return all string without spaces', function () {
            expect(stringBuilder.toString()).to.be.equal('test');
        });
        it('Should return all string without spaces', function () {
            stringBuilder = new StringBuilder();
            expect(stringBuilder.toString()).to.be.equal('');
        });
    });
});