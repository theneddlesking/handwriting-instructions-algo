const Characters = {
    " " : [
        PenUp(),
        Move(1, 0)
    ],

    "'" : [
        PenUp(),
        Move(0.2, 2),
        PenDown(),
        Move(0, -0.2),
        PenUp(),
        Move(-0.2, -1.8)
    ],

    "," : [
        Move(0.1, 0),
        Move(-0.2, -0.2),
        PenUp(),
        Move(0.2, 0.2)
    ],

    "." : [
        Move(0.2, 0)
    ],

    "a" : [
        Move(0, 1),
        Move(1, 0),
        Move(0, -1),
        Move(0.25, 0),
        PenUp(),
        Move(-0.25, 0),
        PenDown(),
        Move(-1, 0),
        PenUp(),
        Move(1.25, 0)
    ],

    "b" : [
        PenUp(),
        Move(0, 2),
        PenDown(),
        Move(0, -2),
        Move(1, 0),
        Move(0, 1),
        Move(-1, 0),
        PenUp(),
        Move(1, -1)
    ],

    "c" : [
        Move(0, 1),
        Move(1, 0),
        PenUp(),
        Move(0, -1),
        PenDown(),
        Move(-1, 0),
        PenUp(),
        Move(1, 0)
    ],

    "d" : [
        PenUp(),
        Move(1, 2),
        PenDown(),
        Move(0, -2),
        Move(-1, 0),
        Move(0, 1),
        Move(1, 0),
        PenUp(),        
        Move(0, -1)
    ],

    "e" : [
        Move(0, 1),
        Move(1, 0),
        Move(0, -0.5),
        Move(-1, 0),
        PenUp(),
        Move(0, -0.5),
        PenDown(),
        Move(1, 0)
    ],

    "f" : [
        PenUp(),
        Move(0, 0.75),
        PenDown(),
        Move(0.75, 0),
        PenUp(),
        Move(-0.75/2, -0.75),
        PenDown(),
        Move(0, 2),
        Move(0.75, 0),
        PenUp(),
        Move(0, -2),
    ],

    "g" : [
        PenUp(),
        Move(0, -1),
        PenDown(),
        Move(1, 0),
        Move(0, 1),
        Move(-1, 0),
        Move(0, 1),
        Move(1, 0),
        Move(0, -1)
    ],

    "h" : [
        Move(0, 2),
        PenUp(),
        Move(0, -1),
        PenDown(),
        Move(1, 0),
        Move(0, -1)
    ],

    "i" : [
        Move(0, 1),
        PenUp(),
        Move(0, 0.5),
        PenDown(),
        Move(0, 0.1),
        PenUp(),
        Move(0, -1.6)
    ],

    "j" : [
        PenUp(),
        Move(0.25, 0),
        PenDown(),  
        Move(0, 1),
        PenUp(),
        Move(0, 0.5),
        PenDown(),
        Move(0, 0.1),
        PenUp(),
        Move(0, -1.6),
        PenDown(),
        Move(0, -1),
        Move(-1, 0),
        PenUp(),
        Move(1, 1)

    ],

    "k" : [
        Move(0, 2),
        PenUp(),
        Move(0, -2),
        PenDown(),
        Move(1, 1),
        PenUp(),
        Move(-0.5, -0.5),
        PenDown(),
        Move(0.5, -0.5)
    ],

    "l" : [
        Move(0, 2),
        PenUp(),
        Move(0, -2),
        PenDown(),
        Move(0.25, 0)
    ],

    "m" : [
        Move(0, 1),
        Move(0.5, 0),
        Move(0, -1),
        PenUp(),
        Move(0, 1),
        PenDown(),
        Move(0.5, 0),
        Move(0, -1)
    ],

    "n" : [
        Move(0, 1),
        Move(1, 0),
        Move(0, -1),
        PenUp(),
    ],

    "o" : [
        PenUp(),
        Move(1, 0),
        PenDown(),
        Move(-1, 0),
        Move(0, 1),
        Move(1, 0),
        Move(0, -1)
    ],

    "p" : [
        PenUp(),
        Move(0, -1),
        PenDown(),
        Move(0, 1),
        Move(1, 0),
        Move(0, 1),
        Move(-1, 0),
        Move(0, -1),
        PenUp(),
        Move(1, 0)
    ],

    "q" : [
        PenUp(),
        Move(1, 0),
        PenDown(),
        Move(-1, 0),
        Move(0, 1),
        Move(1, 0),
        Move(0, -2),
        PenUp(),
        Move(0, 1)
    ],

    "r" : [
        Move(0, 1),
        Move(1, 0),
        PenUp(),
        Move(0, -1)
    ],

    "s" : [
        Move(1, 0),
        Move(0, 0.5),
        Move(-1, 0),
        Move(0, 0.5),
        Move(1, 0),
        PenUp(),
        Move(0, -1)
    ],

    "t" : [
        PenUp(),
        Move(0, 1.25),
        PenDown(),
        Move(0.75, 0),
        PenUp(),
        Move(-0.75/2, -1.25),
        PenDown(),
        Move(0, 2),
        PenUp(),
        Move(0.75/2, -2)
    ],

    "u" : [
        PenUp(),
        Move(0, 1),
        PenDown(),
        Move(0, -1),
        Move(1, 0),
        Move(0, 1),
        PenUp(),
        Move(0, -1)
    ],

    "v" : [
        PenUp(),
        Move(0, 1),
        PenDown(),
        Move(0.5, -1),
        Move(0.5, 1),
        PenUp(),
        Move(0, -1)
    ],

    "w" : [
        PenUp(),
        Move(0, 1),
        PenDown(),
        Move(0.25, -1),
        Move(0.25, 0.5),
        Move(0.25, -0.5),
        Move(0.25, 1),
        PenUp(),
        Move(0, -1)
    ],

    "x" : [
        Move(1, 1),
        PenUp(),
        Move(-1, 0),
        PenDown(),
        Move(1, -1)
    ],

    "y" : [
        PenUp(),
        Move(0, 1),
        PenDown(),
        Move(0.5, -1),
        PenUp(),
        Move(-0.5, -1),
        PenDown(),
        Move(1, 2),
        PenDown(),
        PenUp(),
        Move(0, -1)
    ],

    "z" : [
        PenUp(),
        Move(0, 1),
        PenDown(),
        Move(1, 0),
        Move(-1, -1),
        Move(1, 0)
    ],
}


