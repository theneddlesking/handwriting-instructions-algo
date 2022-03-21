//definitely still has bugs
//however, you can find these bugs by transforming the instructions BACK to the SVG path
//and comparing the results

//BUG: z and Z as final moves aren't detected


const autoSketch = true; //once you upload an SVG is it immediately sketched
const svgPaths = []; //stores all svg paths - some sketches have multiple paths

function getInstructionsFromSVGPath(svgPath) {
    const paths = splitSVGPath(svgPath);


    //just for finding bugs / unknown path codes
    let unknownCoord = false;

    for (let path of paths) {

        for (let coord of path.coordinates) {
            if (!svgPath.includes(coord.x)) {

                console.log("Coord not found (x): " + coord.x);
                unknownCoord = true;
            }
            if (!svgPath.includes(coord.y)) {

                console.log("Coord not found (y): " + coord.y);
                unknownCoord = true;
            }

        }
    }

    if (unknownCoord) {
        console.log("Unknown coord from path: ");
        console.log(svgPath);
    }

    console.log(paths)

    // checkHeartPath(paths);

    return paths;
}

function checkHeartPath(paths) {
    for (let instruction of paths) {

        if (instruction.svgPathType == "c") {
            console.log(`Draw a Bezier curve from the current point to a new point with relative coords
             x: ${instruction.coordinates[2].x} and y: ${instruction.coordinates[2].y} with starting control point
             x: ${instruction.coordinates[0].x} and y: ${instruction.coordinates[0].y} and end control point
             x: ${instruction.coordinates[1].x} and y: ${instruction.coordinates[1].y}`);
        }
    }
}

function getPathTypeFromChar(char) {
    return char;
}

function splitSVGPath(path) {
    const paths = [];
    let pathType;
    let coordinates = [];

    //holds x, y
    let currentCoord = {

    };

    //holds value to add to x or y ie. -44.20, parsed as float later
    let currentCoordStr = "";

    let firstPath = true;

    //decimal points included in numbers as floats are valid in SVG paths
    const numbers = "1234567890.-";

    //Path codes and their functions. More info: https://www.w3schools.com/graphics/svg_path.asp    
    const svgPathTypes = "mczlshMCZLSH";

    //separates numbers ie. x and y points
    const separators = ",-" + svgPathTypes;

    for (let char of path) {

        //point separators 
        if (separators.includes(char)) {
            if ((currentCoordStr == "" || currentCoordStr == "-" ) && !firstPath) {

                //if new path begins with - you need to add so it is not skipped
                if (char == "-") {
                    currentCoordStr += "-";
                }

                continue;
            }

            const coord = parseFloat(currentCoordStr);

            //error testing - still triggers sometimes?
            if (isNaN(coord)) {
                console.log("Invalid coord: ");

                console.log(char)
                console.log(currentCoordStr);
            }

            //horizontal paths only have x coord so they need to add it early
            if (pathType == "h" || pathType == "H") {
                currentCoord.x = coord;
            }

            //adds new path coord

            //if no x then add x
            if (currentCoord.x === undefined) {
                currentCoord.x = coord;
            } else { //otherwise add y
                //if x coord already exists then add the y coord which completes the x, y coordinate
                currentCoord.y = coord;
                coordinates.push(currentCoord);
                currentCoord = {};
            } 

            //reset for new coordinate
            currentCoordStr = "";

            //the negative sign both terminates and begins a new number so it needs to be added to the coordinate
            // if (char == "-") {
                // currentCoordStr += "-";    
            // }
    
        }

        //if the character is a new svg path 
        if (svgPathTypes.includes(char)) {

            //cannot add old path of the first path as there is none before the first
            if (firstPath) {
                firstPath = false;
            } else {

                //otherwise, add the new path 
                paths.push({
                    svgPathType : pathType,
                    coordinates : coordinates
                });    
            }

            //reset to new path
            currentCoord = {};
            coordinates = [];
            pathType = getPathTypeFromChar(char);

            continue;
        }
        
        //is a number or a part of a number
        if (numbers.includes(char)) {

            //add the number to the current coord
            currentCoordStr += char;

            continue;
        }

    }
    return paths;
}

//handle files on upload
function handleFiles(files){
    const reader = new FileReader();
    reader.onload = function(e) {

        //grabs svg data from upload
        const svgData = e.target.result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgData, "image/svg+xml");
       
        const pathTags = doc.getElementsByTagName("path");

        console.log("Number of paths: " + pathTags.length);


        for (let pathTag of pathTags) {
            //grabs the paths from SVG upload
            const path = pathTag.getAttribute("d");
            svgPaths.push(path);

            //automatically sketch on upload
            if (autoSketch) {
                const instructions = getInstructionsFromSVGPath(path);
                Instructions.drawFromSVG(instructions);
            }
        }

    }
    reader.readAsText(files[0]);
}