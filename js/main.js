
let game;

// register events
$btnNewGame.addEventListener("click", function () {
    game = new Game("Regzand"); // TODO: prompt for player name
    game.startGame();
});
