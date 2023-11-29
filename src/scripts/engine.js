const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    score2: document.querySelector("#score2"),
    lives: document.querySelector("#lives"),
    errors: document.querySelector("#errors"),
    remaininghp: document.querySelector("#remaininghp")
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    score: 0,
    errors: 0,
    currentTime: 30,
    lives: 5,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.lives.textContent = state.values.lives;
  state.view.errors.textContent = state.values.errors;
  state.view.remaininghp.textContent = state.values.lives;

  if ((state.values.currentTime <= 0) && (state.values.lives > 0)) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Fim de jogo! O seu score foi: " + state.values.score);
  
  } else if (state.values.lives <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);
    alert("Game Over! Tente Novamente!");
  }
}


function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.score++;
        state.view.score.textContent = state.values.score;
        state.view.score2.textContent = state.values.score;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        state.values.errors++;
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
        if(state.values.lives <= 0){
          state.values.currentTime = 0;
      }
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
