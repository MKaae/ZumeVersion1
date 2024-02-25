import { initGame, playerBall, insertBallAfter, clearences } from "../controller/gamecontroller.js";

window.addEventListener("DOMContentLoaded", start);

let currentBall = {};

function start(){
    const ballchain = initGame();
    renderBallChain(ballchain);
    currentBall = playerBalls();
    document.getElementById("ballchain").addEventListener("click", function(event) {
        const buttonIndex = event.target.dataset.index;
        handleButtonClick(buttonIndex, currentBall);
    });
}

async function renderBallChain(balls){
    const ballchain = balls;
    const ballChainLength = ballchain.length();
    let ballchainHTML = "";
    for (let i = 0; i < ballChainLength; i++) {
        const ballNode = ballchain.get(i);
        const ballData = ballNode.data;
        const ballImg = visualBalls[ballData];
        ballchainHTML += `<div class="ball-container"><img class="ball" src="../images/${ballImg}" style="height:50px;width:50px"></div>`;
        if (i !== ballChainLength - 1) { 
            ballchainHTML += createButton(i);
        }
    }
    document.getElementById("ballchain").innerHTML = ballchainHTML;
}

const visualBalls = {
    "🔴": "red.png",
    "🔵": "blue.png",
    "🟡": "yellow.png",
};

function createButton(index) {
    const button = `<button class="arrow-button" style="height:50px" data-index="${index}">↑</button>`;
    return button;
}

function playerBalls() {
    const ball = playerBall();
    const ballImg = visualBalls[ball.data];
    const ballHTML = `<div class="player-ball"><img class="player-ball-img" src="../images/${ballImg}" style="height:50px;width:50px;"></div>`;
    document.getElementById("playerball").innerHTML = ballHTML;
    return ball;
}

function checkClears(ball){
    clearences(ball);
}

function handleButtonClick(index, ball) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("arrow-button")) {
        const ballchain = insertBallAfter(index, ball);
        const ballContainers = document.querySelectorAll("#ballchain .ball-container");
        const nextBallContainer = ballContainers[Number(index)+1]; 
        nextBallContainer.classList.add("expand");
        setTimeout(() => {
            nextBallContainer.classList.remove("expand");
        }, 1100);
        animateFromPlayerBallToBallChain(index, ballchain);
    }
}

function animateFromPlayerBallToBallChain(ballIndex, ballchain) {
    const source = document.querySelector("#playerball img").getBoundingClientRect();
    const ballContainer = document.getElementById("ballchain").querySelectorAll(".ball-container")[Number(ballIndex)+1];
    const destination = ballContainer.getBoundingClientRect();

    const deltaX = destination.x - source.x;
    const deltaY = destination.y - source.y;    

    const playerBallImg = document.querySelector("#playerball img");
    playerBallImg.style.setProperty("--delta-x", deltaX + "px");
    playerBallImg.style.setProperty("--delta-y", deltaY + "px");
    playerBallImg.classList.add("animatefromcannon");

    playerBallImg.addEventListener("animationend", function onAnimationEnd() {
        playerBallImg.removeEventListener("animationend", onAnimationEnd);
        playerBallImg.classList.remove("animatefromcannon");
        playerBallImg.style.removeProperty("--delta-x");
        playerBallImg.style.removeProperty("--delta-y");

        currentBall = playerBalls();
        checkClears(ballchain.get(ballIndex));
        renderBallChain(ballchain);
    });
}