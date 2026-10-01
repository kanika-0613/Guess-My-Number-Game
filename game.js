let secretNo;
let score;
let highScore = 0;
let maxNumber;
let gameStarted = false;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

const easyButton = document.querySelector('.easy');
const mediumButton = document.querySelector('.medium');
const hardButton = document.querySelector('.hard');

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const guessInput = document.querySelector('.guess');
const numberDisplay = document.querySelector('.number');
const scoreDisplay = document.querySelector('.score');
const highScoreDisplay = document.querySelector('.highscore');

const startGame = function (difficulty, max, startingScore) {
    maxNumber = max;
    score = startingScore;

    secretNo = Math.trunc(Math.random() * maxNumber) + 1;

    gameStarted = true;

    easyButton.classList.remove('selected');
    mediumButton.classList.remove('selected');
    hardButton.classList.remove('selected');

    difficulty.classList.add('selected');

    displayMessage(`Guess a number between 1 and ${maxNumber}`);

    numberDisplay.textContent = '?';
    scoreDisplay.textContent = score;
    guessInput.value = '';

    document.querySelector('body').style.background =
        'linear-gradient(135deg, #141e30, #243b55)';
};

easyButton.addEventListener('click', function () {
    startGame(easyButton, 20, 20);
});

mediumButton.addEventListener('click', function () {
    startGame(mediumButton, 50, 25);
});

hardButton.addEventListener('click', function () {
    startGame(hardButton, 100, 30);
});

checkButton.addEventListener('click', function () {
    const guess = Number(guessInput.value);

    if (!gameStarted) {
        displayMessage('Please choose a difficulty first!');
        return;
    }

    if (!guess) {
        displayMessage('Please enter a number!');
        return;
    }

    if (guess < 1 || guess > maxNumber) {
        displayMessage(`Enter a number between 1 and ${maxNumber}`);
        return;
    }

    if (guess === secretNo) {
        displayMessage('🎉 Amazing! You got it!');

        numberDisplay.textContent = secretNo;

        document.querySelector('body').style.background =
            'linear-gradient(135deg, #11998e, #38ef7d)';

        numberDisplay.classList.remove('win-animation');
        void numberDisplay.offsetWidth;
        numberDisplay.classList.add('win-animation');

        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
        }

        createConfetti();

        return;
    }

    if (score > 1) {
        const difference = Math.abs(guess - secretNo);

        if (difference <= 3) {
            displayMessage(
                guess > secretNo
                    ? '🔥 Very Close! Too High!'
                    : '🔥 Very Close! Too Low!'
            );
        } else if (difference <= 10) {
            displayMessage(
                guess > secretNo
                    ? '🟡 Close! Too High!'
                    : '🟡 Close! Too Low!'
            );
        } else {
            displayMessage(
                guess > secretNo
                    ? '🔴 Way Too High!'
                    : '🔵 Way Too Low!'
            );
        }

        score--;
        scoreDisplay.textContent = score;
    } else {
        displayMessage(`😢 You lost! The number was ${secretNo}`);

        numberDisplay.textContent = secretNo;
        scoreDisplay.textContent = 0;
    }
});

againButton.addEventListener('click', function () {
    if (!gameStarted) {
        displayMessage('Choose a difficulty first!');
        return;
    }

    secretNo = Math.trunc(Math.random() * maxNumber) + 1;

    if (easyButton.classList.contains('selected')) {
        score = 20;
    } else if (mediumButton.classList.contains('selected')) {
        score = 25;
    } else {
        score = 30;
    }

    displayMessage(`Guess a number between 1 and ${maxNumber}`);

    numberDisplay.textContent = '?';
    guessInput.value = '';
    scoreDisplay.textContent = score;

    document.querySelector('body').style.background =
        'linear-gradient(135deg, #141e30, #243b55)';
});

function createConfetti() {
    const container = document.querySelector('.confetti-container');

    container.innerHTML = '';

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');

        confetti.classList.add('confetti');

        confetti.style.left = Math.random() * 100 + '%';

        confetti.style.backgroundColor =
            `hsl(${Math.random() * 360}, 100%, 60%)`;

        confetti.style.animationDuration =
            (Math.random() * 2 + 2) + 's';

        confetti.style.animationDelay =
            Math.random() * 0.5 + 's';

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(confetti);
    }

    setTimeout(function () {
        container.innerHTML = '';
    }, 4000);
}