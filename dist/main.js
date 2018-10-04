/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stepped_progress_control_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stepped-progress-control.js */ \"./src/stepped-progress-control.js\");\n\n\n(function(){\n\n    window.onload = ()=>{\n        console.log(\"Document loaded\");\n        \n        /*\n         var c = document.getElementById(\"gauge-svg\").contentDocument;\n         c.getElementById(\"fill1\").setAttribute(\"style\", \"opacity: .75;\");\n         c.getElementById(\"fill2\").setAttribute(\"style\", \"opacity: .65;\");\n         c.getElementById(\"fill3\").setAttribute(\"style\", \"opacity: .55;\");\n\n        document.querySelector(\"#value-indicator\").addEventListener('input', (e)=>{\n            console.log(\"Value changed\");\n            console.log(e.data);\n        });\n        */\n\n        /*\n        var tmp = document.querySelector(\"#value-indicator\");\n        var position1 = document.getElementById(\"gauge-svg\").contentDocument.getElementById(\"fill1\");\n        console.debug(position1);\n        TweenLite.to(position1, .5, {opacity:.75});\n        */\n\n       var gauge = new _stepped_progress_control_js__WEBPACK_IMPORTED_MODULE_0__[\"SteppedProgressControl\"](10, 0, 100, \"test\");\n       //gauge.setCurrentLevel(50);\n\n       document.querySelector(\"#value-indicator\").addEventListener('input', (e)=>{\n           gauge.setCurrentLevel(e.target.value);\n        });\n    }\n\n}\n)();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/stepped-progress-control-element.js":
/*!*************************************************!*\
  !*** ./src/stepped-progress-control-element.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SteppedProgressControlElement; });\n\n\n/**\n * Represents an individual element in an array of elements that indicate a range/progress. As the state or value represented \n * by the control changes, the display properties of individual gauge elements are updated accordingly.\n */\nclass SteppedProgressControlElement{\n    \n    constructor(displayLevel, prefix, index){\n        this.displayLevel = displayLevel;\n        this.prefix = prefix;\n        this.index = index;\n        this.curOpacity;\n    }\n\n    /**\n     * Set opacity level for SVG element for which this instance exists to a new state. Method \n     * will return true if new state is applied, otherwise false indicating that the requested \n     * opacity level matches that of the current level, therefore no update is applied.\n     * \n     * @param {*} opacityLevel \n     * @param {*} transitionTime \n     */\n    setOpacity(opacityLevel, transitionTime){\n        if(this.curOpacity==opacityLevel){\n            return false;\n        }\n        this.curOpacity = opacityLevel;\n        TweenLite.to(this.getDisplayElementRef(), transitionTime, {opacity:opacityLevel});\n        return true;\n    }\n\n    isInRange(curPct){\n        return this.displayLevel<=curPct;\n    }\n\n    getDisplayElementRef(){\n        \n        let svgElement = document.getElementById(this.prefix);\n        if(svgElement==null){\n            throw(`Unable to locate the referenced svg element with id '${this.prefix}'`);\n        }\n\n        let displayElementName = this.prefix +\"-cell-\"+ this.index;\n        let displayElement = svgElement.contentDocument.getElementById(displayElementName);\n        if(displayElement==null){\n            throw (`Unable to locate referenced svg element with id '${displayElementName}'`);\n        }\n        return displayElement;\n    }\n\n}\n\n//# sourceURL=webpack:///./src/stepped-progress-control-element.js?");

/***/ }),

/***/ "./src/stepped-progress-control.js":
/*!*****************************************!*\
  !*** ./src/stepped-progress-control.js ***!
  \*****************************************/
/*! exports provided: GAUGE_STATUS_READY, GAUGE_STATUS_DECREASING, GAUGE_STATUS_INCREASING, DISPLAY_OPACITY_LEVEL_5, DISPLAY_OPACITY_LEVEL_4, DISPLAY_OPACITY_LEVEL_3, DISPLAY_OPACITY_LEVEL_2, DISPLAY_OPACITY_LEVEL_1, DISPLAY_OPACITY_MAX, DISPLAY_OPACITY_MIN, INITIAL_DELAY_INTERVAL, TRANSITION_DELAY_INTERVAL, SteppedProgressControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GAUGE_STATUS_READY\", function() { return GAUGE_STATUS_READY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GAUGE_STATUS_DECREASING\", function() { return GAUGE_STATUS_DECREASING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GAUGE_STATUS_INCREASING\", function() { return GAUGE_STATUS_INCREASING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_OPACITY_LEVEL_5\", function() { return DISPLAY_OPACITY_LEVEL_5; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_OPACITY_LEVEL_4\", function() { return DISPLAY_OPACITY_LEVEL_4; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_OPACITY_LEVEL_3\", function() { return DISPLAY_OPACITY_LEVEL_3; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_OPACITY_LEVEL_2\", function() { return DISPLAY_OPACITY_LEVEL_2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_OPACITY_LEVEL_1\", function() { return DISPLAY_OPACITY_LEVEL_1; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_OPACITY_MAX\", function() { return DISPLAY_OPACITY_MAX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_OPACITY_MIN\", function() { return DISPLAY_OPACITY_MIN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INITIAL_DELAY_INTERVAL\", function() { return INITIAL_DELAY_INTERVAL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TRANSITION_DELAY_INTERVAL\", function() { return TRANSITION_DELAY_INTERVAL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SteppedProgressControl\", function() { return SteppedProgressControl; });\n/* harmony import */ var _stepped_progress_control_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stepped-progress-control-element */ \"./src/stepped-progress-control-element.js\");\n\n\n//Status related values.\nconst GAUGE_STATUS_READY = 0;\nconst GAUGE_STATUS_DECREASING = -1;\nconst GAUGE_STATUS_INCREASING = 1;\n\n//Define opacity levels for cells.\nconst DISPLAY_OPACITY_LEVEL_5 = .8;\nconst DISPLAY_OPACITY_LEVEL_4 = .4;\nconst DISPLAY_OPACITY_LEVEL_3 = .2;\nconst DISPLAY_OPACITY_LEVEL_2 = .1;\nconst DISPLAY_OPACITY_LEVEL_1 = .05;\n\nconst DISPLAY_OPACITY_MAX = DISPLAY_OPACITY_LEVEL_5;\nconst DISPLAY_OPACITY_MIN = DISPLAY_OPACITY_LEVEL_1;\n\n//Define settings related to timing operations.\nconst INITIAL_DELAY_INTERVAL = 1;\nconst TRANSITION_DELAY_INTERVAL = .05;\n\n//Define opacity levels required to present a fade out effect.\nconst fadeLevels = [DISPLAY_OPACITY_LEVEL_4, DISPLAY_OPACITY_LEVEL_3, DISPLAY_OPACITY_LEVEL_2];\n\n/**\n * Represents a control, which is a collection of elements that provide a visual indication of a \n * progress/current level. \n */\nclass SteppedProgressControl{\n\n    /**\n     * numberOfElements The total number of elements that will be used to approximately represent the current level\n     * in a given range.\n     * \n     * minDisplayValue: Minimum value in range.\n     * maxDisplayValue: Maximum value in range.\n     * prefix: Unique prefix identifier for all visual components.\n     */\n    constructor(numberOfElements, minDisplayValue, maxDisplayValue, prefix){\n        this.curLevel = 0;\n        this.status = GAUGE_STATUS_READY;\n        this.gaugeElements = [];\n\n        this.range = maxDisplayValue - minDisplayValue;\n\n        for(var x=0;x<numberOfElements;x++){\n            var displayLevel = (1+x)*(numberOfElements/this.range);\n            this.gaugeElements.push(new _stepped_progress_control_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"](displayLevel, prefix, x));\n        }\n    }\n\n    /**\n     * Method for setting a new value for the current metric. For instances where the value is increasing, \n     * all elements that represent percentages greater or equal to the current percentage in the range will \n     * be set to the maximum opacity level. Immediately adjacent elements to the last element set to full opacity \n     * will be set to decreasing opacity levels in order to emulate a 'fade' type look.\n     * \n     * Changes in opacity are animated over a small time period, with the time increasing per cell in order to \n     * give the affect of more or less 'growing' the values, rather than just fading them in at the same time.\n     * \n     * When the current level is decreased from the previous assigned level, then the effect is applied in reverse.\n     * \n     * Example:\n     * Range is 1-100, with the current level set to 30, with a total of 10 cell elements (each representing 10% of\n     * the range).\n     * [0]=(Full Opacity)\n     * [1]=(Full Opacity)\n     * [2]=(Full Opacity)\n     * [3]=(Full Opacity)\n     * [4]=Decreasing opacity, appx 40%\n     * [5]=Decreasing opacity, appx 10%\n     * [6]=(Minimum Opacity)\n     * [7]=(Minimum Opacity)\n     * [8]=(Minimum Opacity)\n     * [9]=(Minimum Opacity)\n     * \n     * @param {*} newLevel \n     */\n    setCurrentLevel(newLevel){\n        console.log(`Setting new level attribute to ${newLevel} from ${this.curLevel}`);\n        if(newLevel==this.curLevel){\n            return;\n        }\n        console.log(Number(newLevel)>Number(this.curLevel));\n        if(Number(newLevel)>Number(this.curLevel)){\n            console.log(\"Increasing display value...\");\n            this.applyValueIncreaseTransition(newLevel/this.range);\n        }\n        else{\n            console.log(\"Decreasing display value...\");\n            this.applyValueDecreaseTransition(newLevel/this.range);\n        }\n        this.curLevel = newLevel;\n    }\n\n    /**\n\t    Given a collection of cells in an arrray, create an array containing new opacity levels.\n    */\n    assignNewOpacityLevels(targetArr){\n\n        if(targetArr.length>0){\n            targetArr[0]=DISPLAY_OPACITY_LEVEL_4;\n        }\n        if(targetArr.length>1){ \n            targetArr[1]=DISPLAY_OPACITY_LEVEL_3;\n        }\n        if(targetArr.length>2){ \n            targetArr[2]=DISPLAY_OPACITY_LEVEL_2;\n        }        \n        for(var x=3;x<targetArr.length;x++){\n            targetArr[x]=DISPLAY_OPACITY_MIN;    \n        }\n        return targetArr;\n    }\n\n    /**\n        Given a collection of cells in an scenario where a new decreased value is assigned, identify \n        which cells would require an display change.\n    */\n    isolateTargetCells(cellArr, newPct){\n\n        //Identify the position of the last cell in the collection that does not have an opacity level \n        //that reflects a non-fill scenario.\n        var lastIndex = this.getFirstNonEmptyCell(cellArr);\n\n        //Identify the position of the first element in the collection that will remain unchanged by  \n        //the current operation.\n        var firstIndex = this.getFirstOutOfRangeCell(cellArr, newPct);\n\n        console.log(`isolateTargetCells: first index=>${firstIndex}, last index=>${lastIndex}`);\n\n        var results = cellArr.slice(firstIndex, lastIndex);\n        return results;\n    }\n\n    getFirstNonEmptyCell(cells){\n\n        if(cells[cells.length-1].curOpacity!=DISPLAY_OPACITY_MIN){\n            return cells.length;\n        }\n\n        var lastIndex;\n        for(var x=cells.length-1;x>-1;x--){\n            if(cells[x].curOpacity==DISPLAY_OPACITY_MIN){\n                lastIndex=x;\n            }\n            else{\n                return x+1;\n            }\n        }\n        return lastIndex;\n    }\n\n    getFirstOutOfRangeCell(cells, pct){\n        for(var x=0;x<cells.length;x++){\n            if(!cells[x].isInRange(pct)){\n                return x;\n            }\n        }\n        return -1;\n    }\n\n    /**\n\t    Apply animation sequence for a new, increased value.\n    */\n    applyValueIncreaseTransition(representativePct){\n        var fadeIndexPos=-1;\n        var transitionTime = INITIAL_DELAY_INTERVAL;\n        for(var x=0;x<this.gaugeElements.length;x++){\n            if(this.gaugeElements[x].isInRange(representativePct)){\n                if(this.gaugeElements[x].setOpacity(DISPLAY_OPACITY_MAX, transitionTime)){\n                    fadeIndexPos=x;\n                    transitionTime += (TRANSITION_DELAY_INTERVAL*x);\n                }\n            }\n        }\n\n        if(fadeIndexPos!=-1&&fadeIndexPos<this.gaugeElements.length){\n            for(var x=0;x<3;x++){\n                if(fadeIndexPos+x<this.gaugeElements.length){\n                    this.gaugeElements[fadeIndexPos+x].setOpacity( fadeLevels[x],transitionTime);\n                    transitionTime += (TRANSITION_DELAY_INTERVAL*x);\n                }\n            }\n        }\n    }\n\n    /**\n        Apply animation sequence for a new, decreased value.\n    */\n    applyValueDecreaseTransition(representativePct){\n        var targetCells = this.isolateTargetCells(this.gaugeElements, representativePct);\n        console.log(`${targetCells.length} total cells require animation`);\n        var newValues = this.assignNewOpacityLevels(new Array(targetCells.length));\n        for(var x=targetCells.length-1;x>-1;x--){\n            targetCells[x].setOpacity(newValues[x], (INITIAL_DELAY_INTERVAL+(TRANSITION_DELAY_INTERVAL*(targetCells.length-x))));\n        }\n    }\n    \n}\n\n\n//# sourceURL=webpack:///./src/stepped-progress-control.js?");

/***/ }),

/***/ 0:
/*!********************************************************************************************************!*\
  !*** multi ./src/stepped-progress-control.js ./src/stepped-progress-control-element.js ./src/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/stepped-progress-control.js */\"./src/stepped-progress-control.js\");\n__webpack_require__(/*! ./src/stepped-progress-control-element.js */\"./src/stepped-progress-control-element.js\");\nmodule.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/stepped-progress-control.js_./src/stepped-progress-control-element.js_./src/index.js?");

/***/ })

/******/ });