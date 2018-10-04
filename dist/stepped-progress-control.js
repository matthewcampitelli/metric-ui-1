'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SteppedProgressControl = exports.GAUGE_STATUS_INCREASING = exports.GAUGE_STATUS_DECREASING = exports.GAUGE_STATUS_READY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _steppedProgressControl = require('./stepped-progress-control');

var _steppedProgressControl2 = _interopRequireDefault(_steppedProgressControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GAUGE_STATUS_READY = exports.GAUGE_STATUS_READY = 0;
var GAUGE_STATUS_DECREASING = exports.GAUGE_STATUS_DECREASING = -1;
var GAUGE_STATUS_INCREASING = exports.GAUGE_STATUS_INCREASING = 1;

var DISPLAY_OPACITY_LEVEL_4 = .8;
var DISPLAY_OPACITY_LEVEL_3 = .4;
var DISPLAY_OPACITY_LEVEL_2 = .2;
var DISPLAY_OPACITY_LEVEL_1 = .05;

var DISPLAY_OPACITY_MAX = DISPLAY_OPACITY_LEVEL_4;
var DISPLAY_OPACITY_MIN = DISPLAY_OPACITY_LEVEL_1;

/**
 * Represents a control, which is a collection of elements that provide a visual indication of a 
 * progress/current level. 
 */

var SteppedProgressControl = exports.SteppedProgressControl = function () {

    /**
     * numberOfElements The total number of elements that will be used to approximately represent the current level
     * in a given range.
     * 
     * minDisplayValue: Minimum value in range.
     * maxDisplayValue: Maximum value in range.
     * prefix: Unique prefix identifier for all visual components.
     */
    function SteppedProgressControl(numberOfElements, minDisplayValue, maxDisplayValue, prefix) {
        _classCallCheck(this, SteppedProgressControl);

        this.curLevel = 0;
        this.status = GAUGE_STATUS_READY;
        this.gaugeElements = [];

        var range = maxDisplayValue - minDisplayValue;

        for (var x = 0; x < numberOfElements; x++) {
            this.gaugeElements.push(new _steppedProgressControl2.default((x + 1)(numberOfElements) / range, prefix, x));
        }
    }

    /**
     * Method for setting a new level to display. 
     * 
     * @param {*} newLevel 
     */


    _createClass(SteppedProgressControl, [{
        key: 'setCurrentLevel',
        value: function setCurrentLevel(newLevel) {
            if (newLevel = curLevel) {
                return;
            }

            var representativePct = newLevel / range;

            if (newLevel > curLevel) {
                for (var x = 0; x < this.gaugeElements.length; x++) {
                    if (this.gaugeElements[x].isInRange(representativePct)) {
                        this.gaugeElements[x].setOpacity(DISPLAY_OPACITY_LEVEL_4);
                    }
                }
            } else {}
        }
    }]);

    return SteppedProgressControl;
}();

//export const GaugeControl;