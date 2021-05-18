const scoreLimit = document.querySelector("#choose-score");
const scoreBoard = document.querySelector("#scorecard");
const resetBtn = document.querySelector("#restart");
let finalScore = 0;
const scoreSound = document.querySelector("#add-score");

const p1 = {
    btn: document.querySelector("#p1btn"),
    score: 0,
    tally: document.createElement("span")
}

const p2 = {
    btn: document.querySelector("#p2btn"),
    score: 0,
    tally: document.createElement("span")
}

function initialiseScoreboard() {
    p1.tally.innerHTML = p1.score;
    p2.tally.innerHTML = p2.score;
    scoreBoard.append(p1.tally, " to ", p2.tally);
};
initialiseScoreboard();

resetBtn.addEventListener('click', resetGame)

scoreLimit.addEventListener('change', function () {
    finalScore = Number(scoreLimit.value);
    resetGame();
})

function resetGame() {
    p1.score = 0;
    p2.score = 0;
    p1.tally.innerHTML = p1.score;
    p2.tally.innerHTML = p2.score;
    p1.btn.disabled = false;
    p2.btn.disabled = false;
    p1.tally.removeAttribute("class");
    p2.tally.removeAttribute("class");
}

function soundEffect() {
    scoreSound.currentTime = 0.050;
    scoreSound.play();
    setTimeout(function () {
        scoreSound.pause();
    }, 450);
}

function disableBtnCheck(score, btn) {
    if (score === finalScore) {
        p1.btn.disabled = true;
        p2.btn.disabled = true;
        if (btn === "p1btn") {
            p1.tally.classList.add("win-color")
            p2.tally.classList.add("lose-color")
        }
        else {
            p1.tally.classList.add("lose-color")
            p2.tally.classList.add("win-color")
        }
    }
}

function increaseScore(player, playerID) {
    if (finalScore != 0) {
        player.score++;
        player.tally.innerHTML = player.score;
        disableBtnCheck(player.score, playerID);
        soundEffect();
    }
    else {
        alert("Please input a final score!");
    }
}

p1.btn.addEventListener('click', function (event) {
    const playerBtn = event.target.id
    increaseScore(p1, playerBtn);
})

p2.btn.addEventListener('click', function (event) {
    const playerBtn = event.target.id
    increaseScore(p2, playerBtn);
})







