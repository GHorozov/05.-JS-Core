let expect = require('chai').expect;
const Sumator = require('../02. Sumator.js');


describe("Sumator tests", function () {
    let sumator;
    beforeEach(function () {
        sumator = new Sumator();
    });

    it('Check if data lenght is empty', function () {
        expect(sumator.data.length).to.equal(0);
    });
    it('Check if data lenght is more than one', function () {
        sumator.add(5);
        sumator.add(5);
        sumator.add(5);
        expect(sumator.data.length).to.equal(3);
    });

    describe('check if function exist', function () {
        it('Array should not be undefined', function () {
            expect(sumator.data !== undefined).to.be.equal(true);
        });
        it('Is add func exist', function () {
            expect(Sumator.prototype.hasOwnProperty('add')).to.be.equal(true);
        });
        it('Is sumNums func exist', function () {
            expect(Sumator.prototype.hasOwnProperty('sumNums')).to.be.equal(true);
        });
        it('Is removeByFilter func exist', function () {
            expect(Sumator.prototype.hasOwnProperty('removeByFilter')).to.be.equal(true);
        });
        it('Is toString func exist', function () {
            expect(Sumator.prototype.hasOwnProperty('toString')).to.be.equal(true);
        });
    });
    
    describe("Add function tests", function () {
        it('Add strings, return strings', function () {
            sumator.add('test');
            sumator.add('test1');
            expect(sumator.data.join(', ')).to.be.equal('test, test1');
        });
        it('Add numbers, return numbers', function () {
            sumator.add(5);
            sumator.add(3);
            expect(sumator.data.join(', ')).to.be.equal('5, 3');
        });
        it('Add object, return [object Object]', function () {
            sumator.add({name: 'Ivan'});
            expect(sumator.data.join(', ')).to.be.equal('[object Object]');
        });
        it('Add mixed, return mixed input', function () {
            sumator.add('test');
            sumator.add(5);
            sumator.add({name: 'Ivan'});
            expect(sumator.data.join(', ')).to.be.equal('test, 5, [object Object]');
        });
    });

    describe('SumNums function tests', function () {
        it('Add strings, return 0', function () {
            sumator.add('test');
            sumator.add('12');
            expect(sumator.sumNums()).to.be.equal(0);
        });
        it('Add numbers, return correct sum of numbers', function () {
            sumator.add(5);
            sumator.add(5);
            expect(sumator.sumNums()).to.be.equal(10);
        });
        it('Add object, return 0', function () {
            sumator.add({name: 'Ivan'});
            expect(sumator.sumNums()).to.be.equal(0);
        });
        it('Add mixed, return sum of numbers', function () {
            sumator.add('test');
            sumator.add(5);
            sumator.add({name: 'Ivan'});
            expect(sumator.sumNums()).to.be.equal(5);
        });
    });

    describe('RemoveByFilter function tests', function () {
        it('Remove add numbers, returns only even numbers', function () {
            sumator.add(1);
            sumator.add(2);
            sumator.add(3);
            sumator.add(4);
            sumator.add(5);

            sumator.removeByFilter((x) => x % 2 !== 0);

            expect(sumator.data.join(', ')).to.be.equal('2, 4')
        });

        it('Remove nothing, returns same input', function () {
            sumator.add(1);
            sumator.add(3);
            sumator.add(5);

            sumator.removeByFilter((x) => x % 2 === 0);

            expect(sumator.data.join(', ')).to.be.equal('1, 3, 5')
        });
        it('Remove nothing, returns same input', function () {
            sumator.add(1);
            sumator.add(3);
            sumator.add(5);

            sumator.removeByFilter((x) => x > 6);

            expect(sumator.data.join(', ')).to.be.equal('1, 3, 5')
        });

        it('Undefined throw error', function () {
            sumator.add(1);
            sumator.add(3);
            sumator.add(5);

            expect(() => sumator.removeByFilter(undefined)).to.throw();
        });
    });

    describe('ToString function tests', function () {
        it('If array is empty, return empty', function () {
            expect(sumator.toString()).to.be.equal('(empty)');
        });
        it('If there is elements, return elements with , and space', function () {
            sumator.add('test');
            sumator.add(5);
            sumator.add('Ivan');
            expect(sumator.toString()).to.be.equal('test, 5, Ivan');
        })
    });
});

