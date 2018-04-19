/*
    States:
        0 - ready
        1 - running
        2 - ended
 */

class Game{

    constructor(playerName){
        this.score = 0;
        this.playerName = playerName;
        this.state = 0;
    }

    startGame(){
        this.startTime = new Date();
        this.state = 1;

        // hide panel
        Panel.close();

        // start game loop
        window.requestAnimationFrame(this.gameLoop.bind(this));

        // logging
        console.log("Game started");
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
