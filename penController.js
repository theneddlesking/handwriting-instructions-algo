const Pen = {
    isDown : false,

    margin : 20,
    lineHeight : characterSize * 3.5,



    position : {
        x : 500,
        y : 500,
    },

    color : function(color) {
        Canvas.updateStrokeStyle(color);
    },

    up : function() {
        this.isDown = false;
    },

    down : function() {
        this.isDown = true;
    },

    setPosition : function(x, y) {
        this.position.x = x;
        this.position.y = y;
    },

    copyPosition : function(position, y) {
        if (y !== undefined) {
            return {
                x : position,
                y : y
            }
        }
        return {
            x : position.x,
            y : position.y
        }
    },

    
    newLine : function() {
        this.setPosition(this.margin, this.position.y + this.lineHeight);
    },

    moveRelative : function(x, y) {
        this.moveTo(this.position.x + x, this.position.y + y);
    },

    quadraticBezier : function(t, p0, p1, p2, v) {
        return p0[v] * ( (1 - t) ** 2 ) + 2 * t * p1[v] * (1 - t) + (t ** 2) * p2[v];
    },

    cubicBezier : function(t, p0, p1, p2, p3, v) {
        return p0[v] * ( (1 - t) ** 3 ) + 3 * t * p1[v] * ( (1 - t) ** 2 ) + 3 * p2[v] * (t ** 2) * (1 - t) + (t ** 3) * p3[v];
    },

    getRelativePoint(point) {
        return {x : Pen.position.x + point.x, y : Pen.position.y + point.y};
    },

    drawRelativeBezierCurve : function(p1, p2, p3) {
        Pen.down();

        if (!p3) {
            this.drawBezierCurve(this.position, this.getRelativePoint(p1), this.getRelativePoint(p2), 0.001);
            return;
        }

        this.drawBezierCurve(this.position, this.getRelativePoint(p1), this.getRelativePoint(p2), this.getRelativePoint(p3), 0.001);
    },

    drawBezierCurve : function(p0, p1, p2, p3, step) {
            const zoom = 1;

            //quadratic bezier
            let quadratic = false;
            if (!step) {
                quadratic = true;
                step = p3;
            }

            for (let t=0; t <=1; t += step) {
                let x, y;
                if (quadratic) {
                    x = this.quadraticBezier(t, p0, p1, p2, "x") * zoom;
                    y = this.quadraticBezier(t, p0, p1, p2, "y") * zoom;    
                } else {
                    x = this.cubicBezier(t, p0, p1, p2, p3, "x") * zoom;
                    y = this.cubicBezier(t, p0, p1, p2, p3, "y") * zoom;    
                }



                this.moveTo(x, y);   
            }
    },

    moveTo : function(x, y) {
        const oldPosition = this.copyPosition(this.position.x, this.position.y);

        this.setPosition(x, y);

        if (this.isDown) {
            Canvas.drawLine(oldPosition, this.position);    
        } 
        
    },

}