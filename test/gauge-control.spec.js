import {SteppedProgressControl, GAUGE_STATUS_READY, DISPLAY_OPACITY_LEVEL_4, DISPLAY_OPACITY_LEVEL_3, DISPLAY_OPACITY_LEVEL_2, DISPLAY_OPACITY_MIN} from "../src/stepped-progress-control";
import SteppedProgressControlElement from "../src/stepped-progress-control-element";

var chai = require('chai'); 
var assert = chai.assert;
const sinon = require("sinon");

describe("GaugeControl",function(){

    describe("Initialization",function(){
        it("Should initialize correctly", function(){
            var gauge = new SteppedProgressControl(10, 0, 100, "test");

            assert.equal(gauge.status, GAUGE_STATUS_READY); 
            assert.equal(gauge.gaugeElements.length, 10);

            for(var x=0;x<10;x++){
                assert.equal(gauge.gaugeElements[x].displayLevel, ((x+1)*.10));    
            }
        });
    });

    describe("Decrease value",function(){

        /**
         * Given an array of all cells belonging to a control, confirm that the component can correctly 
         * isolate the cells which would be impacted by an operration where the value is decrreased.
         */
        it("Should isolate target cells for animation effect", function(){

            var cells, cell, results;
            var ctl = new SteppedProgressControl(10, 0, 100, "test");

            //
            cells = new Array();
            for(var x=0;x<10;x++){
                cell = new SteppedProgressControlElement(x*.10, "test", 0);
                cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
                cells.push(cell);            
            }
            
            cells[6].curOpacity = DISPLAY_OPACITY_LEVEL_3;
            cells[7].curOpacity = DISPLAY_OPACITY_LEVEL_2;
            cells[8].curOpacity = DISPLAY_OPACITY_MIN;
            cells[9].curOpacity = DISPLAY_OPACITY_MIN;

            results = ctl.isolateTargetCells(cells, .3);
            chai.assert.equal(results.length, 5);

        });

        /**
         * 
         */
        it("Should identify first out of range cell", function(){

            var cell, cells;

            var ctl = new SteppedProgressControl(10, 0, 100, "test");
            cells = new Array();
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cells.push(cell);
            cell = new SteppedProgressControlElement(.35, "test", 0);
            cells.push(cell);
            cell = new SteppedProgressControlElement(.45, "test", 0);
            cells.push(cell);
            cell = new SteppedProgressControlElement(.55, "test", 0);
            cells.push(cell);
            
            assert.equal(ctl.getFirstOutOfRangeCell(cells, .34), 1);
            assert.equal(ctl.getFirstOutOfRangeCell(cells, .36), 2);
            assert.equal(ctl.getFirstOutOfRangeCell(cells, .75), -1);

        });

        /**
        * 
        */
        it("Should identify first non-empty cell", function(){

            var cell, cells, result;
            var ctl = new SteppedProgressControl(10, 0, 100, "test");

            //Confirm that standard case where all levels of opacity are correctly handled. 
            cells = new Array();
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_3;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_2;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_MIN;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_MIN;
            cells.push(cell);
            result = ctl.getFirstNonEmptyCell(cells);
            assert.equal(result, 3);

            //Confirm that in an instance where all cells that represent 100% fill, the last element is returned. 
            cells = new Array();
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
            cells.push(cell);
            result = ctl.getFirstNonEmptyCell(cells);
            assert.equal(result, 4);

            cells = new Array();
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
            cells.push(cell);
            cell = new SteppedProgressControlElement(.25, "test", 0);
            cell.curOpacity = DISPLAY_OPACITY_LEVEL_4;
            cells.push(cell);
            result = ctl.getFirstNonEmptyCell(cells);
            assert.equal(result, 3);

        });

        /**
         * Given an array representing a set of cells which would be impacted by reducing the value for a 
         * control, confirm that the control will correctly identify the 'new' opacity values for the affected
         * cells. 
         */
        it("Should assign correct opacity levels", function(){
            
            var cellArray;
            var ctl = new SteppedProgressControl(10, 0, 100, "test");

            //Gold case scenario, impacted cells large enough to hold all possible values of opacity levels.
            cellArray = new Array(4);
            ctl.assignNewOpacityLevels(cellArray);
            assert.equal(cellArray[0], DISPLAY_OPACITY_LEVEL_4);
            assert.equal(cellArray[1], DISPLAY_OPACITY_LEVEL_3);
            assert.equal(cellArray[2], DISPLAY_OPACITY_LEVEL_2);
            assert.equal(cellArray[3], DISPLAY_OPACITY_MIN);

            //Alternate cases, where number of impacted cells are less then the number required to represent all 
            //opacity levels.
            cellArray = new Array(3);
            ctl.assignNewOpacityLevels(cellArray);
            assert.equal(cellArray[0], DISPLAY_OPACITY_LEVEL_4);
            assert.equal(cellArray[1], DISPLAY_OPACITY_LEVEL_3);
            assert.equal(cellArray[2], DISPLAY_OPACITY_LEVEL_2);

            cellArray = new Array(2);
            ctl.assignNewOpacityLevels(cellArray);
            assert.equal(cellArray[0], DISPLAY_OPACITY_LEVEL_4);
            assert.equal(cellArray[1], DISPLAY_OPACITY_LEVEL_3);
        });

        it('should call correct top level transition operation', function(){
            var ctl = new SteppedProgressControl();
            var applyValueIncreaseTransition = sinon.stub(ctl, 'applyValueIncreaseTransition');
            var applyValueDecreaseTransition = sinon.stub(ctl, 'applyValueDecreaseTransition');
            ctl.setCurrentLevel(10);
            ctl.setCurrentLevel(8);
            ctl.setCurrentLevel(7);
            sinon.assert.callCount(applyValueDecreaseTransition,2);
        });

        

    });

    describe("Increase value",function(){
        it('should call correct top level transition operation', function(){
            var ctl = new SteppedProgressControl();
            var applyValueIncreaseTransition = sinon.stub(ctl, 'applyValueIncreaseTransition');
            ctl.setCurrentLevel(10);
            sinon.assert.calledOnce(applyValueIncreaseTransition);
        });    
    });

});