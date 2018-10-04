import SteppedProgressControlElement from './stepped-progress-control-element';

//Status related values.
export const GAUGE_STATUS_READY = 0;
export const GAUGE_STATUS_DECREASING = -1;
export const GAUGE_STATUS_INCREASING = 1;

//Define opacity levels for cells.
export const DISPLAY_OPACITY_LEVEL_5 = .8;
export const DISPLAY_OPACITY_LEVEL_4 = .4;
export const DISPLAY_OPACITY_LEVEL_3 = .2;
export const DISPLAY_OPACITY_LEVEL_2 = .1;
export const DISPLAY_OPACITY_LEVEL_1 = .05;

export const DISPLAY_OPACITY_MAX = DISPLAY_OPACITY_LEVEL_5;
export const DISPLAY_OPACITY_MIN = DISPLAY_OPACITY_LEVEL_1;

//Define settings related to timing operations.
export const INITIAL_DELAY_INTERVAL = 1;
export const TRANSITION_DELAY_INTERVAL = .05;

//Define opacity levels required to present a fade out effect.
const fadeLevels = [DISPLAY_OPACITY_LEVEL_4, DISPLAY_OPACITY_LEVEL_3, DISPLAY_OPACITY_LEVEL_2];

/**
 * Represents a control, which is a collection of elements that provide a visual indication of a 
 * progress/current level. 
 */
export class SteppedProgressControl{

    /**
     * numberOfElements The total number of elements that will be used to approximately represent the current level
     * in a given range.
     * 
     * minDisplayValue: Minimum value in range.
     * maxDisplayValue: Maximum value in range.
     * prefix: Unique prefix identifier for all visual components.
     */
    constructor(numberOfElements, minDisplayValue, maxDisplayValue, prefix){
        this.curLevel = 0;
        this.status = GAUGE_STATUS_READY;
        this.gaugeElements = [];

        this.range = maxDisplayValue - minDisplayValue;

        for(var x=0;x<numberOfElements;x++){
            var displayLevel = (1+x)*(numberOfElements/this.range);
            this.gaugeElements.push(new SteppedProgressControlElement(displayLevel, prefix, x));
        }
    }

    /**
     * Method for setting a new value for the current metric. For instances where the value is increasing, 
     * all elements that represent percentages greater or equal to the current percentage in the range will 
     * be set to the maximum opacity level. Immediately adjacent elements to the last element set to full opacity 
     * will be set to decreasing opacity levels in order to emulate a 'fade' type look.
     * 
     * Changes in opacity are animated over a small time period, with the time increasing per cell in order to 
     * give the affect of more or less 'growing' the values, rather than just fading them in at the same time.
     * 
     * When the current level is decreased from the previous assigned level, then the effect is applied in reverse.
     * 
     * Example:
     * Range is 1-100, with the current level set to 30, with a total of 10 cell elements (each representing 10% of
     * the range).
     * [0]=(Full Opacity)
     * [1]=(Full Opacity)
     * [2]=(Full Opacity)
     * [3]=(Full Opacity)
     * [4]=Decreasing opacity, appx 40%
     * [5]=Decreasing opacity, appx 10%
     * [6]=(Minimum Opacity)
     * [7]=(Minimum Opacity)
     * [8]=(Minimum Opacity)
     * [9]=(Minimum Opacity)
     * 
     * @param {*} newLevel 
     */
    setCurrentLevel(newLevel){
        console.log(`Setting new level attribute to ${newLevel} from ${this.curLevel}`);
        if(newLevel==this.curLevel){
            return;
        }
        console.log(Number(newLevel)>Number(this.curLevel));
        if(Number(newLevel)>Number(this.curLevel)){
            console.log("Increasing display value...");
            this.applyValueIncreaseTransition(newLevel/this.range);
        }
        else{
            console.log("Decreasing display value...");
            this.applyValueDecreaseTransition(newLevel/this.range);
        }
        this.curLevel = newLevel;
    }

    /**
	    Given a collection of cells in an arrray, create an array containing new opacity levels.
    */
    assignNewOpacityLevels(targetArr){

        if(targetArr.length>0){
            targetArr[0]=DISPLAY_OPACITY_LEVEL_4;
        }
        if(targetArr.length>1){ 
            targetArr[1]=DISPLAY_OPACITY_LEVEL_3;
        }
        if(targetArr.length>2){ 
            targetArr[2]=DISPLAY_OPACITY_LEVEL_2;
        }        
        for(var x=3;x<targetArr.length;x++){
            targetArr[x]=DISPLAY_OPACITY_MIN;    
        }
        return targetArr;
    }

    /**
        Given a collection of cells in an scenario where a new decreased value is assigned, identify 
        which cells would require an display change.
    */
    isolateTargetCells(cellArr, newPct){

        //Identify the position of the last cell in the collection that does not have an opacity level 
        //that reflects a non-fill scenario.
        var lastIndex = this.getFirstNonEmptyCell(cellArr);

        //Identify the position of the first element in the collection that will remain unchanged by  
        //the current operation.
        var firstIndex = this.getFirstOutOfRangeCell(cellArr, newPct);

        console.log(`isolateTargetCells: first index=>${firstIndex}, last index=>${lastIndex}`);

        var results = cellArr.slice(firstIndex, lastIndex);
        return results;
    }

    getFirstNonEmptyCell(cells){

        if(cells[cells.length-1].curOpacity!=DISPLAY_OPACITY_MIN){
            return cells.length;
        }

        var lastIndex;
        for(var x=cells.length-1;x>-1;x--){
            if(cells[x].curOpacity==DISPLAY_OPACITY_MIN){
                lastIndex=x;
            }
            else{
                return x+1;
            }
        }
        return lastIndex;
    }

    getFirstOutOfRangeCell(cells, pct){
        for(var x=0;x<cells.length;x++){
            if(!cells[x].isInRange(pct)){
                return x;
            }
        }
        return -1;
    }

    /**
	    Apply animation sequence for a new, increased value.
    */
    applyValueIncreaseTransition(representativePct){
        var fadeIndexPos=-1;
        var transitionTime = INITIAL_DELAY_INTERVAL;
        for(var x=0;x<this.gaugeElements.length;x++){
            if(this.gaugeElements[x].isInRange(representativePct)){
                if(this.gaugeElements[x].setOpacity(DISPLAY_OPACITY_MAX, transitionTime)){
                    fadeIndexPos=x;
                    transitionTime += (TRANSITION_DELAY_INTERVAL*x);
                }
            }
        }

        if(fadeIndexPos!=-1&&fadeIndexPos<this.gaugeElements.length){
            for(var x=0;x<3;x++){
                if(fadeIndexPos+x<this.gaugeElements.length){
                    this.gaugeElements[fadeIndexPos+x].setOpacity( fadeLevels[x],transitionTime);
                    transitionTime += (TRANSITION_DELAY_INTERVAL*x);
                }
            }
        }
    }

    /**
        Apply animation sequence for a new, decreased value.
    */
    applyValueDecreaseTransition(representativePct){
        var targetCells = this.isolateTargetCells(this.gaugeElements, representativePct);
        console.log(`${targetCells.length} total cells require animation`);
        var newValues = this.assignNewOpacityLevels(new Array(targetCells.length));
        for(var x=targetCells.length-1;x>-1;x--){
            targetCells[x].setOpacity(newValues[x], (INITIAL_DELAY_INTERVAL+(TRANSITION_DELAY_INTERVAL*(targetCells.length-x))));
        }
    }
    
}
