//a movement from one point to another

function PenDown() {
    return {type : "pen", down: true};
}

function PenUp() {
    return {type : "pen", down: false};
}

function Move(x, y) {
    return {type : "move", x : x * characterSize, y : -y * characterSize};
}


