let expect = require('chai').expect;
let isSymmetric =require('../05. Check for Symmetry.js');

describe('Symmetry tests', function () {
    it('Should return equal false [1,2]', function () {
        expect(isSymmetric([1,2])).to.be.equal(false);
    });
    it('Should return equal false [string, 1]', function () {
        expect(isSymmetric(['string', 1])).to.be.equal(false);
    });
    it('Should return equal false [true, 1]', function () {
        expect(isSymmetric([true, 1])).to.be.equal(false);
    });
    it('Should return equal true [1,2,1]', function () {
        expect(isSymmetric([1,2,1])).to.be.equal(true);
    });
    it('Should return equal true []', function () {
        expect(isSymmetric([])).to.be.equal(true);
    });
    it('Should return equal true [test, 1, test]', function () {
        expect(isSymmetric(['test', 1, 'test'])).to.be.equal(true);
    });
    it('Should return equal true [test]', function () {
        expect(isSymmetric(['test'])).to.be.equal(true);
    });
    it('Should return equal true string', function () {
        expect(isSymmetric('sdadad')).to.be.equal(false);
    });
});