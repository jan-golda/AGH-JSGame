const $scoreboard = document.getElementById("scoreboard");
const $btnNewGame = document.getElementById("new-game");
const $panel = document.getElementById("panel");
const $score = document.getElementById("score");
const $timer = document.getElementById("timer");

const Panel = (function Panel(){

    let scores = [];

    function close() {
        $panel.classList.remove("open");
    }

    function open() {
        $panel.classList.add("open");
    }

    function setScore(score) {
        $score.textContent = score;
    }

    function setTimer(time) {
        $timer.textContent = formatTime(time);
    }

    function addScore(playerName, score) {
        scores.push({playerName: playerName, score: score});
        updateScoreboard();
    }

    function getScores() {
        return scores;
    }

    function updateScoreboard() {

        // sort scoreboard
        scores = scores.sort((a,b) => b.score - a.score);

        // clear scoreboard DOM
        $scoreboard.innerHTML = "";

        // add to scoreboard;
        for(let i = 0; i < scores.length && i < Settings.scoreboard.size; i++){

            // number
            let number = document.createElement("span");
            number.classList.add("number");
            number.textContent = "#"+(i+1);

            // name
            let name = document.createElement("span");
            name.classList.add("name");
            name.textContent = scores[i].playerName;

            // score
            let score = document.createElement("span");
            score.classList.add("score");
            score.textContent = scores[i].score;

            // row
            let row = document.createElement("div");
            row.classList.add("row");
            row.appendChild(number);
            row.appendChild(name);
            row.appendChild(score);

            $scoreboard.appendChild(row);
        }
    }

    function formatTime(ms){
        return Math.floor(ms/1000/60) + ":" + (ms/1000 < 10 ? '0' : '') + Math.floor(ms/1000%60);
    }

    return {
        close: close,
        open: open,
        setScore: setScore,
        setTimer: setTimer,
        addScore: addScore,
        getScores: getScores,
        updateScoreboard: updateScoreboard
    }

})();