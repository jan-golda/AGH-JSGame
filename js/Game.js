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

        // setup keyboard handler
        this._setupKeyboard();

        // start game loop
        window.requestAnimationFrame(this.gameLoop.bind(this));

        // logging
        console.log("Game started");
    }

    _spawnPlayer(){
        this.player = Matter.Bodies.circle(
            this.gameEngine.getWidth()/2,
            this.gameEngine.getHeight()/2,
            Settings.player.radius
        );
        this.gameEngine.add(this.player);
    }

    _movePlayer(vec){
        Matter.Body.applyForce(this.player, this.player.position, vec);
    }

    _setupKeyboard(){
        document.addEventListener("keydown", this._onKeyDown.bind(this));
    }

    _onKeyDown(event){
        switch (event.key){
            case "ArrowUp":
                this._movePlayer(Matter.Vector.create(0, -1));
                break;
            case "ArrowRight":
                this._movePlayer(Matter.Vector.create(1, 0));
                break;
            case "ArrowDown":
                this._movePlayer(Matter.Vector.create(0, 1));
                break;
            case "ArrowLeft":
                this._movePlayer(Matter.Vector.create(-1, 0));
                break;
        }
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
