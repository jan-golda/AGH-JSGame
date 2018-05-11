const Settings = {
    player: {
        radius: 20,
        mass: 5,
        force: 0.05,
        mouseForce: 0.00004,
        friction: 0.05,
        frictionStatic: 0.2,
        frictionAir: 0.005,
        restitution: 0.7,
        fillStyle: "#546E7A",
    },
    squares: {
        count: 10,
        size: 50,
        mass: 1,
        friction: 0,
        frictionStatic: 0.2,
        frictionAir: 0,
        restitution: 1,
        initialForce: 0.05,
        points: {
            min: -20,
            max: 20,
            interval: 500,
            change: 2
        },
        colors: {
            min: new Color("#FF0000"),
            max: new Color("#00FF00")
        }
    },
    game: {
        stageTime: 60*1000,
        stagesCount: 3
    },
    scoreboard: {
        size: 3
    },
    world: {
        gravity: {scale: 0}
    },
    renderer: {
        height: document.getElementById("board").offsetHeight,
        width: document.getElementById("board").offsetWidth,
        wireframeBackground: 'transparent',
        background: 'transparent',
        wireframes: false
    },
    board: {
        wallWidth: 100
    }
};
