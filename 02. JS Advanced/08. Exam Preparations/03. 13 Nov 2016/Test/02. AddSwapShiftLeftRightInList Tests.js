const expect = require('chai').expect;
const createList = require('../02. AddSwapShiftLeftRightInList.js');

describe('CreateList tests', function () {
    let list;
    beforeEach(function () {
        list = createList();
    });

    it('Check if all func are in CreateList', function () {
        expect(list.toString().length).to.equal(0);
        expect(list.hasOwnProperty('add')).to.equal(true);
        expect(list.hasOwnProperty('shiftLeft')).to.equal(true);
        expect(list.hasOwnProperty('shiftRight')).to.equal(true);
        expect(list.hasOwnProperty('swap')).to.equal(true);
        expect(list.hasOwnProperty('toString')).to.equal(true);
    });

    //Add
    it('Check array lenght', function () {
        list.add(1);
        list.add('two');
        list.add(3);
        list.add({name: "gosho"});
        expect(list.toString()).to.be.equal('1, two, 3, [object Object]');
    });


    //shiftLeft
    it('Shiftleft', function () {
        list.add(1);
        list.add('two');
        list.add(3);
        list.shiftLeft();
        expect(list.toString()).to.be.equal('two, 3, 1');
    });


    //shiftRight
    it('ShiftRight', function () {
        list.add(1);
        list.add('two');
        list.add(3);
        list.shiftRight();
        expect(list.toString()).to.be.equal('3, 1, two');
    });

    //swap
    it('Check array with negative index', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(-1,2)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check array with negative index', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(2,-1)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('with a non integer first index, should not change the collection', function () {
        list.add('one');
        list.add('two');
        list.swap([4, 13], 1);
        expect(list.toString()).to.equal("one, two");
    });
    it('with first index equal to number of elements, should return false', function () {
        list.add('one');
        list.add('two');
        list.add('three');
        expect(list.swap(3, 1)).to.equal(false);
    });
    it('Check array with > index', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(5, 2)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check array with > index', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(12, 2)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check array with > index', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(2,5)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check index equal lenght', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(4,2)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check index equal lenght', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(2,4)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check index equal non integer', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap('1',4)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check index equal non integer', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(1,'1')).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check indexes are equal ', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(2, 2)).to.be.false;
        expect(list.toString()).to.be.equal('Ivan, 5, Georgi, 12');
    });
    it('Check index are equal zero', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(0, 1)).to.be.true;
        expect(list.toString()).to.be.equal('5, Ivan, Georgi, 12');
    });
    it('Check index are equal zero', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(3, 0)).to.be.true;
        expect(list.toString()).to.be.equal('12, 5, Georgi, Ivan');
    });
    it('Check index 0, 2', function () {
        list.add('Ivan');
        list.add('5');
        list.add('Georgi');
        list.add('12');
        expect(list.swap(0, 2)).to.be.true;
        expect(list.toString()).to.be.equal('Georgi, 5, Ivan, 12');
    });


    //toString
    it('Check  toString', function () {
        expect(list.toString().length).to.be.equal(0);
    });
});