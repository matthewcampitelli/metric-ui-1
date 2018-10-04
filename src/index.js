import {SteppedProgressControl} from './stepped-progress-control.js';

(function(){

    window.onload = ()=>{
        console.log("Document loaded");
        
        /*
         var c = document.getElementById("gauge-svg").contentDocument;
         c.getElementById("fill1").setAttribute("style", "opacity: .75;");
         c.getElementById("fill2").setAttribute("style", "opacity: .65;");
         c.getElementById("fill3").setAttribute("style", "opacity: .55;");

        document.querySelector("#value-indicator").addEventListener('input', (e)=>{
            console.log("Value changed");
            console.log(e.data);
        });
        */

        /*
        var tmp = document.querySelector("#value-indicator");
        var position1 = document.getElementById("gauge-svg").contentDocument.getElementById("fill1");
        console.debug(position1);
        TweenLite.to(position1, .5, {opacity:.75});
        */

       var gauge = new SteppedProgressControl(10, 0, 100, "test");
       //gauge.setCurrentLevel(50);

       document.querySelector("#value-indicator").addEventListener('input', (e)=>{
           gauge.setCurrentLevel(e.target.value);
        });
    }

}
)();