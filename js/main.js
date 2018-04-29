const gameEngine = new GameEngine();
let game;

// register events
$btnNewGame.addEventListener("click", function () {
    game = new Game(gameEngine, "Regzand"); // TODO: prompt for player name
    game.startGame();
});
