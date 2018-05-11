/*
    States:
        0 - ready
        1 - running
        2 - ended
 */

class Game{

    constructor(gameEngine, playerName){
        this.score = 0;
        this.playerName = playerName;
        this.state = 0;
        this.gameEngine = gameEngine;
    }

    startGame(){
        this.startTime = new Date();
        this.state = 1;

        // hide panel
        Panel.close();

        // prepare board
        this.gameEngine.clear();
        this._spawnPlayer();
        this._spawnSquares();

        // setup input handler
        this._setupInput();

        // start game loop
        window.requestAnimationFrame(this.gameLoop.bind(this));

        // set squares loop
        setInterval(this._updateSquares.bind(this), Settings.squares.points.interval)

        // logging
        console.log("Game started");
    }

    _spawnPlayer(){
        this.player = Matter.Bodies.circle(
            this.gameEngine.getWidth()/2,
            this.gameEngine.getHeight()/2,
            Settings.player.radius
        );
        this.player.mass = Settings.player.mass;
        this.player.friction = Settings.player.friction;
        this.player.frictionStatic = Settings.player.frictionStatic;
        this.player.frictionAir = Settings.player.frictionAir;
        this.player.restitution = Settings.player.restitution;

        this.player.label = "Player";
        this.player.render.fillStyle = Settings.player.fillStyle;

        this.player.onCollideEnd(this._onPlayerCollide.bind(this));

        this.gameEngine.add(this.player);
    }

    _movePlayer(vec){
        Matter.Body.applyForce(this.player, this.player.position, vec);
    }

    _setupInput(){
        document.addEventListener("keydown", this._onKeyDown.bind(this));
        document.addEventListener("mousemove", this._onMouseMove.bind(this));
    }

    _spawnSquares(){
        for(let i = 0; i<Settings.squares.count; i++){
            let rect = Matter.Bodies.rectangle(
                random(Settings.squares.size, Settings.renderer.width - Settings.squares.size),
                random(Settings.squares.size, Settings.renderer.width - Settings.squares.size),
                Settings.squares.size,
                Settings.squares.size
            );
            rect.mass = Settings.squares.mass;
            rect.friction = Settings.squares.friction;
            rect.frictionStatic = Settings.squares.frictionStatic;
            rect.frictionAir = Settings.squares.frictionAir;
            rect.restitution = Settings.squares.restitution;

            rect.label = "Square";

            Matter.Body.applyForce(rect, rect.position, Matter.Vector.create(
                (Math.random()-0.5) * Settings.squares.initialForce,
                (Math.random()-0.5) * Settings.squares.initialForce
            ));

            rect.points = random(Settings.squares.points.min, Settings.squares.points.max);

            let procentage = rect.points / (Settings.squares.points.max - Settings.squares.points.min) * 100;
            rect.render.fillStyle = LinearColorInterpolator.findColorBetween(Settings.squares.colors.min, Settings.squares.colors.max, procentage).asRgbCss();

            this.gameEngine.add(rect);
        }
    }

    _onKeyDown(event){
        switch (event.key){
            case "ArrowUp":
                this._movePlayer(Matter.Vector.create(0, -Settings.player.force));
                break;
            case "ArrowRight":
                this._movePlayer(Matter.Vector.create(Settings.player.force, 0));
                break;
            case "ArrowDown":
                this._movePlayer(Matter.Vector.create(0, Settings.player.force));
                break;
            case "ArrowLeft":
                this._movePlayer(Matter.Vector.create(-Settings.player.force, 0));
                break;
        }
    }

    _onMouseMove(event){
        if(event.buttons !== 1) return;
        this._movePlayer(Matter.Vector.create(
            (event.clientX - this.player.position.x) * Settings.player.mouseForce,
            (event.clientY - this.player.position.y) * Settings.player.mouseForce
        ));
    }

    _onPlayerCollide(pair){
        let square = null;
        if(pair.bodyA.label === "Square")
            square = pair.bodyA;
        if(pair.bodyB.label === "Square")
            square = pair.bodyB;
        if(square === null) return;

        console.log("Collided with square: " + square.points + " points");
        this.score += square.points;

        square.points = Settings.squares.points.min;
    }

    _updateSquares(){
        this.gameEngine.world.bodies.forEach(function (body) {
            if(body.label !== "Square") return;
            body.points = Math.min(body.points+Settings.squares.points.change, Settings.squares.points.max);
            let procentage = body.points / (Settings.squares.points.max - Settings.squares.points.min) * 100;
            body.render.fillStyle = LinearColorInterpolator.findColorBetween(Settings.squares.colors.min, Settings.squares.colors.max, procentage).asRgbCss();
        });
    }

    endGame(){

        // set game state
        this.state = 2;

        // add score to scoreboard
        Panel.addScore(this.playerName, this.score);

        // show panel
        Panel.open();

        // logging
        console.log("Game ended");

    }

    gameLoop(){
        if(this.state !== 1) return;

        // check game time
        if(this.getTimeLeft() <= 0)
            return this.endGame();

        // update timer and score displays
        Panel.setScore(this.score);
        Panel.setTimer(this.getTimeLeft());

        // request next animation frame
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    getGameStage(){
        return Math.floor((new Date() - this.startTime) / Settings.game.stageTime);
    }

    getTimeLeft(){
        return Settings.game.stagesCount * Settings.game.stageTime - (new Date() - this.startTime);
    }

}
