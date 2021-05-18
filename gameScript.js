const scoreLimit = document.querySelector("#choose-score");
const scoreBoard = document.querySelector("#scorecard");
const resetBtn = document.querySelector("#restart");
const scoreSound = document.querySelector("#add-score");
const tieSound = document.querySelector("#tie-sound");
const winSound = document.querySelector("#win-sound");
const scoreLabel = document.querySelector("#score-label");
const tieOption = document.createElement("option");
let finalScore = 0;

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
    if (scoreLimit.value > 10) {
        scoreLimit.value = 5;
    }
    finalScore = Number(scoreLimit.value);
    scoreLimit.removeAttribute("class");
    scoreLabel.textContent = "Playing to:"
    p1.btn.style.cursor = "default";
    p2.btn.style.cursor = "default";
    scoreLimit.remove(7);
}

function soundEffect() {
    scoreSound.currentTime = 0.050;
    scoreSound.play();
    setTimeout(function () {
        scoreSound.pause();
    }, 450);
}

function disableBtnCheck(pscore, btn, escore) {
    if (pscore === escore && pscore === finalScore - 1) {
        finalScore = pscore + 2;
        tieOption.value = finalScore;
        tieOption.textContent = String(finalScore);
        scoreLimit.append(tieOption);
        scoreLimit.value = finalScore;;
        scoreLimit.classList.add("tie-animation");
        scoreLabel.textContent = "Tie Breaker upto:";
        tieSound.play();
    }
    else if (pscore === finalScore) {
        p1.btn.disabled = true;
        p2.btn.disabled = true;
        p1.btn.style.cursor = " not-allowed";
        p2.btn.style.cursor = " not-allowed";
        winSound.play();
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

function increaseScore(player, playerID, enemy) {
    if (finalScore != 0) {
        player.score++;
        player.tally.innerHTML = player.score;
        disableBtnCheck(player.score, playerID, enemy.score);
        soundEffect();
        console.log(finalScore);
    }
    else {
        alert("Please input a final score!");
    }
}

p1.btn.addEventListener('click', function (event) {
    const playerBtn = event.target.id
    increaseScore(p1, playerBtn, p2);
})

p2.btn.addEventListener('click', function (event) {
    const playerBtn = event.target.id
    increaseScore(p2, playerBtn, p1);
})







