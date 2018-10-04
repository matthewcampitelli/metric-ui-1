"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents an individual element in an array of elements that indicate a range/progress. As the state or value represented 
 * by the control changes, the display properties of individual gauge elements are updated accordingly.
 */
var SteppedProgressControlElement = function () {
    function SteppedProgressControlElement(displayLevel, prefix, index) {
        _classCallCheck(this, SteppedProgressControlElement);

        this.displayLevel = displayLevel;
        this.prefix = prefix;
    }

    _createClass(SteppedProgressControlElement, [{
        key: "setOpacity",
        value: function setOpacity(opacityLevel) {
            TweenLite.to(this.svgAttributeRef, .5, { opacity: opacityLevel });
        }
    }, {
        key: "isInRange",
        value: function isInRange(curPct) {
            return this.displayLevel >= curPct;
        }
    }, {
        key: "getDisplayElementRef",
        value: function getDisplayElementRef() {
            return document.getElementById(this.svgAttributeRef = prefx + "-cell-" + index);
        }
    }]);

    return SteppedProgressControlElement;
}();

exports.default = SteppedProgressControlElement;