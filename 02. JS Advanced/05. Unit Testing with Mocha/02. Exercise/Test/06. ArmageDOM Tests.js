const jsdom = require('jsdom-global')();
const $ = require('jquery');
const expect = require('chai').expect;

const nuke = require('../06. ArmageDOM.js').nuke;

describe('ArmageDOM tests', function () {
    //let selector = $('#target'); //take hrml from DOM
    beforeEach('init HTML', function () {
        document.body.innerHTML =
            `<div id="target">
                  <div class="nested target">
                    <p>This is some text</p>
                  </div>
                  <div class="target">
                    <p>Empty div</p>
                  </div>
                  <div class="inside">
                    <span class="nested">Some more text</span>
                    <span class="target">Some more text</span>
                  </div>
            </div>`;
    });

    it('Should not modify DOM if both selectors are equal', function () {
        let beforeNuke = $('body').html();
        nuke('#target', '#target');
        let afterNuke = $('body').html();
        expect(beforeNuke).to.equal(afterNuke);
    });
    it('Should not modify DOM if first selector is invalid', function () {
        let beforeNuke = $('body ').html();
        nuke('#target', '#target');
        let afterNuke = $('body').html();
        expect(beforeNuke).to.equal(afterNuke);
    });
    it('Should not modify DOM if second selector is invalid', function () {
        let beforeNuke = $('body').html();
        nuke('#target', '#target');
        let afterNuke = $('body ').html();
        expect(beforeNuke).to.equal(afterNuke);
    });
    it('Should not modify DOM if there is noting to delete', function () {
        let selector1 = ('.nested');
        let selector2 = ('.inside');
        let oldHtml = $('#target').html();
        nuke(selector1, selector2);
        let newHtml = $('#target').html();
        expect(newHtml).to.equal(oldHtml);
    });
    it('Should not modify DOM if selectors are valid', function () {
        let originalHtml = $('#target');
        let beforeNuke = $('.inside').html();
        let afterNuke = $('.nested').html();
        nuke(beforeNuke, afterNuke);
        expect(originalHtml).to.equal(afterNuke);
    });
});

