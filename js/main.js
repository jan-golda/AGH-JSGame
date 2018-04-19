// DOM objects
const $btnNewGame = document.getElementById("new-game");
const $panel = document.getElementById("panel");
const $score = document.getElementById("score");
const $timer = document.getElementById("timer");
const $scoreboard = document.getElementById("scoreboard");

// scoreboard
var scoreboard = [];

// game state
var gameState = {
    playerName: null,
    score: null,
    startTime: null,
    state: -2           // -2 - init, -1 - ended, 0 - running
};

function startGame() {

    // resets game state
    gameState.playerName = "Regzand"; // TODO: ask for username
    gameState.score = 0;
    gameState.startTime = new Date();
    gameState.state = 0;

    // hide panel
    $panel.classList.remove("open");

    // start game loop
    window.requestAnimationFrame(gameLoop);

    // logging
    console.log("Game started");
}

function endGame() {

    // set game state
    gameState.state = -1;

    // add score to scoreboard
    addScore(gameState.playerName, gameState.score);

    // show panel
    $panel.classList.add("open");

    // logging
    console.log("Game ended");

}

function gameLoop() {
    if(gameState === undefined) return;
    if(gameState.state < 0) return;

    // check game time
    if(getTimeLeft() <= 0)
        return endGame();

    // update timer and score displays
    $score.textContent = gameState.score;
    $timer.textContent = formatTime(getTimeLeft());

    // request next animation frame
    window.requestAnimationFrame(gameLoop);
}

function getGameStage(){
    return Math.floor((new Date() - gameState.startTime) / settings.game.stageTime);
}

function getTimeLeft(){
    return settings.game.stagesCount * settings.game.stageTime - (new Date() - gameState.startTime);
}

function formatTime(ms){
    return Math.floor(ms/1000/60) + ":" + (ms/1000 < 10 ? '0' : '') + Math.floor(ms/1000%60);
}

function addScore(playerName, score) {
    scoreboard.push({playerName: playerName, score: score});
    updateScoreboard();
}

function updateScoreboard() {
    // sort scoreboard
    scoreboard = scoreboard.sort((a,b) => b.score - a.score);

    // clear scoreboard DOM
    $scoreboard.innerHTML = "";

    // add to scoreboard;
    for(var i = 0; i < scoreboard.length && i < settings.scoreboard.size; i++){

        // number
        var number = document.createElement("span");
            number.classList.add("number");
            number.textContent = "#"+(i+1);

        // name
        var name = document.createElement("span");
            name.classList.add("name");
            name.textContent = scoreboard[i].playerName;

        // score
        var score = document.createElement("span");
            score.classList.add("score");
            score.textContent = scoreboard[i].score;

        // row
        var row = document.createElement("div");
            row.classList.add("row");
            row.appendChild(number);
            row.appendChild(name);
            row.appendChild(score);

        $scoreboard.appendChild(row);
    }
}

// register events
$btnNewGame.addEventListener("click", startGame);
