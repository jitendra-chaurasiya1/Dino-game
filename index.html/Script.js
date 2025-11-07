let score = 0;
let cross = true;

document.onkeydown = function (e) {
  let dino = document.querySelector('.dino');
  let restartBtn = document.querySelector('#restartBtn');

  // Jump (↑ Arrow Key)
  if (e.keyCode == 38) {
    if (!dino.classList.contains('animateDino')) {
      dino.classList.add('animateDino');
      setTimeout(() => {
        dino.classList.remove('animateDino');
      }, 700);
    }
  }

  // Move Right (→)
  if (e.keyCode == 39) {
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = (dinoX + 112) + "px";
  }

  // Move Left (←)
  if (e.keyCode == 37) {
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = (dinoX - 112) + "px";
  }

  // ✅ Restart game when Enter key pressed
  if (e.keyCode == 13 && restartBtn.style.display === "block") {
    restartGame();
  }
};

let interval = setInterval(() => {
  let dino = document.querySelector('.dino');
  let gameOver = document.querySelector('.gameOver');
  let obstacle = document.querySelector('.obstacle');
  let scoreCont = document.querySelector('#scoreCont');
  let restartBtn = document.querySelector('#restartBtn');

  if (!gameOver || !obstacle || !dino) return;

  let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
  let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
  let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

  let offsetX = Math.abs(dx - ox);
  let offsetY = Math.abs(dy - oy);

  // Collision Detection
  if (offsetX < 113 && offsetY < 52) {
    gameOver.style.visibility = "visible";
    obstacle.classList.remove('obstacleAni');
    restartBtn.style.display = "block"; // ✅ show restart button
    clearInterval(interval);
  }
  // Scoring
  else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
      let newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + 's';
    }, 500);
  }
}, 10);

function updateScore(score) {
  document.querySelector('#scoreCont').innerHTML = "Your Score: " + score;
}

// ✅ Restart game function (used by button & Enter key)
function restartGame() {
  location.reload(); // Refresh page to restart
}

// ✅ Button click also restarts
document.getElementById('restartBtn').addEventListener('click', restartGame);
