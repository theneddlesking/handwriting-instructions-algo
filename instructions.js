const Instructions = {
    instructions : [],


    clearInstructions : function() {
        this.instructions = [];
    },

    generateFromText : function(text) {
        this.clearInstructions();

        for (let char of text) {


            const penDownInstruction = {type: "pen", down: true};

            this.drawFromInstructions([penDownInstruction]);

            const characterInstructions = this.getCharacterInstructions(char);
            this.drawFromInstructions(characterInstructions);

            this.createSpaceBetweenCharacters();

            if (Pen.position.x > 1100) {
                Pen.newLine();
            }    
        }

        return this.instructions;
    },  

    createSpaceBetweenCharacters : function() {

        const spaceInstruction = [
            {type : "pen", down: false},
            {type : "move", x : characterSpacing, y: 0},
        ];

        this.drawFromInstructions(spaceInstruction);
        
    },

    getCharacterInstructions : function(char) {
        return Characters[char];
    },


    drawFromSVG : function(svg) {
        const instructionNum = svg.length;

        this.instructions = this.instructions.concat(svg);

        for (let i = 0; i < instructionNum; i++) {
            setTimeout(function() {
                const instruction = svg[i];

                switch (instruction.svgPathType) {
                    case "c":
                        Pen.drawRelativeBezierCurve(instruction.coordinates[0], instruction.coordinates[1], instruction.coordinates[2]);
                        break;
                    case "C":
                        Pen.drawBezierCurve(Pen.position, instruction.coordinates[0], instruction.coordinates[1], instruction.coordinates[2], 0.01);
                        break;    
                    case "l":
                        Pen.moveRelative(instruction.coordinates[0].x, instruction.coordinates[0].y);
                        break;
                    case "L":
                        Pen.moveTo(instruction.coordinates[0].x, instruction.coordinates[0].y);
                        break;    
                    case "s":
                        Pen.drawRelativeBezierCurve(instruction.coordinates[0], instruction.coordinates[1]);
                        break;
                    case "S":
                        Pen.drawBezierCurve(Pen.position, instruction.coordinates[0], instruction.coordinates[1], 0.01);
                        break;
                    case "h":
                        Pen.moveRelative(instruction.coordinates[0].x, instruction.coordinates[0].y);
                        break;
                    case "H":
                        Pen.moveTo(instruction.coordinates[0].x, instruction.coordinates[0].y);
                        break;
                    case "z":
                        Pen.up();
                        Pen.moveTo(instruction.coordinates[0].x, instruction.coordinates[0].y);
                        Pen.down();
                        break;
                    case "M":
                        Pen.up();
                        Pen.moveTo(instruction.coordinates[0].x, instruction.coordinates[0].y);
                        Pen.down();    
                        break;
                    
                    default:
                        console.log("Unknown path type: " + instruction.svgPathType);
                        console.log(instruction.coordinates)
                }
            }, i * 0);
        }
    },

    drawInstruction : function(instruction) {
        
    },
    
    drawFromInstructions : function(instructions) {

        if (!instructions) {
            return;
        }

        for (let instruction of instructions) {

            if (instruction.type == "pen") {
                if (instruction.down) {
                    Pen.down();
                } else {
                    Pen.up();
                }
            }
            if (instruction.type == "move") {
                Pen.moveRelative(instruction.x, instruction.y);
            }

            this.instructions.push(instruction);
        }
    },
}


let para = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor elit vitae sem vulputate elementum. Curabitur cursus pellentesque augue sed iaculis. Nam pellentesque eu sem vitae facilisis. Proin dictum egestas diam nec vehicula. Nunc faucibus gravida sapien, quis posuere erat tempor id. Aliquam tempor magna nunc, nec tincidunt erat pretium vel. Ut fringilla odio vel ipsum sagittis dapibus. Fusce in elementum purus. Suspendisse potenti. Phasellus faucibus, enim a blandit consectetur, felis tellus fringilla enim, vitae elementum arcu lectus at massa. Duis egestas mauris sit amet lobortis convallis. Curabitur a lacus tortor. Praesent congue eros quis eros hendrerit tincidunt. Pellentesque imperdiet massa nisi, nec tempus erat condimentum ut.

Nullam quis egestas diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Curabitur consequat, justo at porta accumsan, urna mi maximus velit, vehicula tincidunt libero orci eu massa. Proin et fermentum tellus. Aenean nunc quam, porta non ipsum eu, finibus efficitur magna. Suspendisse potenti.

In mollis, ante sit amet sodales ultrices, arcu leo cursus eros, quis eleifend magna ante et arcu. Etiam vestibulum, ex quis faucibus rhoncus, quam neque luctus lorem, ac egestas lorem ante blandit enim. Vivamus eu placerat nisl, non dapibus nulla. Aenean enim turpis, porta sed ullamcorper ut, laoreet accumsan nibh. Curabitur libero ligula, aliquet a justo ut, mollis mattis justo. Mauris ac felis nibh. Pellentesque tristique nisi quis sapien sollicitudin consectetur. Curabitur quis lacus eu mauris tincidunt tincidunt non non nisi. Suspendisse cursus ultrices varius. Donec vitae suscipit dui, vel tristique ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed a pellentesque leo, in lacinia enim. Mauris congue accumsan blandit. Suspendisse at varius ante.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec luctus vulputate dignissim. Vivamus tellus tellus, eleifend et semper ac, vulputate rutrum sapien. Proin suscipit ligula ut augue vestibulum vestibulum. Etiam in tempor erat, quis iaculis felis. Vivamus ullamcorper lorem ut dui efficitur faucibus. Nunc tincidunt nibh ac dolor cursus placerat. Etiam vitae tempus est.

Quisque porttitor diam quis pellentesque imperdiet. Curabitur sodales est turpis, a ultricies nisi vehicula nec. Cras auctor ac erat non bibendum. Donec pulvinar urna nec nunc laoreet, a rhoncus ipsum tincidunt. Proin hendrerit leo sit amet pulvinar porta. Sed vitae tristique odio. Phasellus lacinia et augue vitae placerat. Curabitur egestas sapien nec tellus volutpat gravida. Pellentesque quis eros eros. Praesent ullamcorper egestas nisl, vitae blandit lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ut placerat libero, fermentum elementum felis. Fusce lacinia maximus lorem, in gravida leo bibendum vel.`


para = para.toLowerCase();

// const testInstructions = Instructions.generateFromText(para);
// 
// console.log("Generated instructions...");
// console.log(testInstructions)

// Pen.drawBezierCurve({x: 200, y: 200}, {x: 50, y: 100}, {x: 250, y: 700}, {x: 300, y: 500}, 0.01);
