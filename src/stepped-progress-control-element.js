

/**
 * Represents an individual element in an array of elements that indicate a range/progress. As the state or value represented 
 * by the control changes, the display properties of individual gauge elements are updated accordingly.
 */
export default class SteppedProgressControlElement{
    
    constructor(displayLevel, prefix, index){
        this.displayLevel = displayLevel;
        this.prefix = prefix;
        this.index = index;
        this.curOpacity;
    }

    /**
     * Set opacity level for SVG element for which this instance exists to a new state. Method 
     * will return true if new state is applied, otherwise false indicating that the requested 
     * opacity level matches that of the current level, therefore no update is applied.
     * 
     * @param {*} opacityLevel 
     * @param {*} transitionTime 
     */
    setOpacity(opacityLevel, transitionTime){
        if(this.curOpacity==opacityLevel){
            return false;
        }
        this.curOpacity = opacityLevel;
        TweenLite.to(this.getDisplayElementRef(), transitionTime, {opacity:opacityLevel});
        return true;
    }

    isInRange(curPct){
        return this.displayLevel<=curPct;
    }

    getDisplayElementRef(){
        
        let svgElement = document.getElementById(this.prefix);
        if(svgElement==null){
            throw(`Unable to locate the referenced svg element with id '${this.prefix}'`);
        }

        let displayElementName = this.prefix +"-cell-"+ this.index;
        let displayElement = svgElement.contentDocument.getElementById(displayElementName);
        if(displayElement==null){
            throw (`Unable to locate referenced svg element with id '${displayElementName}'`);
        }
        return displayElement;
    }

}