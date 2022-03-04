const autoSketch = true;
const svgPaths = [];

//uppercase M means move the absolute coordinates (pen up)
//lower case m means moves relative
//lowercase c means relative bezier
//C means absolute bezier
//lowercase or uppercase z means a straight line to the start of the path


function getInstructionsFromSVGPath(svgPath) {
    const paths = splitSVGPath(svgPath);

    for (let path of paths) {

        for (let coord of path.coordinates) {
            if (!svgPath.includes(coord.x) || !svgPath.includes(coord.y)) {
                console.log("Coord not found: ")
                console.log(coord)
            }
        }
    }

    return paths;
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

    //holds value to add to x or y
    let currentCoordStr = "";

    let firstPath = true;

    const numbers = "1234567890.";
    const svgPathTypes = "mczMCZ";
    const separators = ",-" + svgPathTypes;


    for (let char of path) {



        //point separators
        if (separators.includes(char)) {
            if ((currentCoordStr == "" || currentCoordStr == "-" ) && !firstPath) {
                continue;
            }

            const coord = parseFloat(currentCoordStr);

            if (isNaN(coord)) {
                console.log(currentCoordStr)
            }

            if (currentCoord.x == undefined) {
                currentCoord.x = coord;
            } else {
                currentCoord.y = coord;
                coordinates.push(currentCoord);
                currentCoord = {};
            } 

            currentCoordStr = "";

            if (char == "-") {
                currentCoordStr += "-";    
            }
    
        }

        //if the character is a new svg path 
        if (svgPathTypes.includes(char)) {

            //cannot add old path of first path because this is the first one
            if (firstPath) {
                firstPath = false;
            } else {
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
        
        //is a number
        if (numbers.includes(char)) {
            currentCoordStr += char;

            continue;
        }


    }
    return paths;
}

function handleFiles(files){
    const reader = new FileReader();
    reader.onload = function(e) {
        const svgData = e.target.result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgData, "image/svg+xml");
        const pathTags = doc.getElementsByTagName("path");

        for (let pathTag of pathTags) {
            const path = pathTag.getAttribute("d");
            svgPaths.push(path);

            if (autoSketch) {
                const instructions = getInstructionsFromSVGPath(path);
                Instructions.drawFromSVG(instructions);
            }
        }

    }
    reader.readAsText(files[0]);
}