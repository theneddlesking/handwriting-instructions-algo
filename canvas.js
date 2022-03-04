const CanvasElement = document.getElementById("canvas");
const Context = CanvasElement.getContext("2d");

CanvasElement.width = document.documentElement.clientWidth;
CanvasElement.height = document.documentElement.clientHeight;

const characterSize = 20;
const characterSpacing = 10;

const Canvas = {
    dimensions : {
        width: CanvasElement.width,
        height: CanvasElement.height,
    },

    lineWidth : '1',
    strokeStyle : "black",

    curveIterations : 100, 


    drawLine : function(startPos, endPos) {            
        Context.beginPath();
        Context.moveTo(startPos.x, startPos.y);
        Context.lineTo(endPos.x, endPos.y);
        Context.stroke();
    },

    init : function() {
        Context.lineWidth = this.lineWidth;
        Context.strokeStyle = this.strokeStyle;
    }
}

Canvas.init();
// Canvas.drawLine({x: 0, y: 0}, {x: 250, y: 100});