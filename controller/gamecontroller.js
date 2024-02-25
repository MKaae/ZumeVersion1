`use-strict`;

import { BallChain } from '../model/BallChain.js';
import { Ball } from '../model/Ball.js';

const balls = ["🔴", "🔵","🟡"]
const ballchain = new BallChain();

export function initGame(){
    ballchain.add(new Ball(balls[Math.floor(Math.random() * balls.length)]));
    ballchain.addFirst(new Ball(balls[Math.floor(Math.random() * balls.length)]));
    ballchain.addFirst(new Ball(balls[Math.floor(Math.random() * balls.length)]));
    ballchain.addFirst(new Ball(balls[Math.floor(Math.random() * balls.length)]));
    ballchain.addFirst(new Ball(balls[Math.floor(Math.random() * balls.length)]));
    ballchain.addFirst(new Ball(balls[Math.floor(Math.random() * balls.length)]));
    ballchain.addFirst(new Ball(balls[Math.floor(Math.random() * balls.length)]));
    return ballchain;
}
export function playerBall(){
    const ball = new Ball(balls[Math.floor(Math.random() * balls.length)]);
    return ball;
}

export function insertBallAfter(index, ball){
    ballchain.insertAfter(index, ball);
    return ballchain;
}

export function clearences(node) {
    const matches = [node];
    let before = node.prev;
    while (before != null && before.data === node.data) {
        matches.push(before);
        before = before.prev;
    }
    let after = node.next;
    while (after != null && after.data === node.data) {
        matches.push(after);
        after = after.next;
    }
    if (matches.length < 3) {
        return [];
    }
    clearMatches(matches);
}

function clearMatches(matches) {
    const nodesToRemove = [];
    let currentNode = ballchain.head;
    while (currentNode !== null) {
        if (matches.includes(currentNode)) {
            nodesToRemove.push(currentNode);
        }
        currentNode = currentNode.next;
    }
    for (const node of nodesToRemove) {
        ballchain.removeNode(node);
    }
}