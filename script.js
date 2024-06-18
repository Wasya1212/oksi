const letterElement = document.getElementById('letter');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');

const cuteWords = [
    "чарівна",
    "чудова",
    "неповторна",
    "незамінна",
    "досконала",
    "божественна",
    "чудесна",
    "неземна",
    "ангельська",
    "сонячна",
    "промениста",
    "весела",
    "смішлива",
    "доброзичлива",
    "щедра",
    "милосердна",
    "турботлива",
    "ніжна",
    "ласкава",
    "вірна",
    "віддана",
    "щира",
    "відкрита",
    "чесна",
    "мудра",
    "розумна",
    "талановита",
    "обдарована",
    "цікава",
    "захоплююча",
    "важлива",
    "необхідна",
    "єдина",
    "моя",
    "кохана",
    "неповторна",
    "єдина",
    "найкраща",
    "дорога",
    "рідна",
    "близька",
    "мила",
    "чудова",
    "прекрасна",
    "захоплююча",
    "чаруюча",
    "незвичайна",
    "дивовижна",
    "неповторна",
    "особлива",
    "виняткова",
    "надзвичайна",
    "феноменальна",
    "унікальна",
    "незрівнянна",
    "неперевершена",
    "ідеальна",
    "бездоганна",
    "досконала",
    "бездоганна",
    "бездоганна",
];

const letters = 'оксімілашкакайфуйвідпочивайботикотикакотикинемаютьнапрягатисьтакщотитамтежненапрягайсяібудьняшкоюякоютизавждиібулаібудеш';
let timeLeft = 120;
let timerInterval;
let image1Element = document.getElementById('image1');
let image2Element = document.getElementById('image2');
const screenWidth = window.innerWidth * 0.75;
const widthPerLetter = screenWidth / letters.length;
const percentagePerLetter = (widthPerLetter / screenWidth);

function addRandomDiv() {
    const divElement = document.createElement('div');
    divElement.classList.add('text');
  
    const randomText = cuteWords[Math.floor(Math.random() * cuteWords.length)];
    divElement.textContent = randomText;
  
    const bodyElement = document.body;
    const bodyWidth = bodyElement.offsetWidth;
    const bodyHeight = bodyElement.offsetHeight;
    const left = Math.floor(Math.random() * (bodyWidth - divElement.offsetWidth));
    const top = Math.floor(Math.random() * (bodyHeight - divElement.offsetHeight));
    divElement.style.position = 'absolute';
    divElement.style.left = `${left}px`;
    divElement.style.top = `${top}px`;
  
    const randomScale = Math.random() + 1;
    const randomRotation = Math.floor(Math.random() * 90 - 90);
    divElement.style.transform = `scale(${randomScale}) rotate(${randomRotation}deg)`;
  
    bodyElement.insertBefore(divElement, bodyElement.firstChild);
  }

function animateImageMovement() {
    const startPosition1 = image1Element.getBoundingClientRect().left;
    const startPosition2 = image2Element.getBoundingClientRect().left;
    const endPosition = startPosition2 - percentagePerLetter * (startPosition2 - startPosition1);

    let currentPosition1 = startPosition1;

    if (currentPosition1 < endPosition) {
        currentPosition1 += screenWidth * percentagePerLetter;
        image1Element.style.left = `${currentPosition1}px`;
    }
}

let currentLetterIndex = 0;

function startGame() {
  displayCurrentLetter();
  startTimer();
}

function displayCurrentLetter() {
  if (currentLetterIndex < letters.length) {
    letterElement.textContent = letters[currentLetterIndex];
  } else {
    letterElement.textContent = 'Котики зустрілись';
    endGame();
  }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    if (timeLeft > 0) {
        messageElement.textContent = 'Ви успішно пройшли гру!';
    } else {
        messageElement.textContent = 'Час вийшов! Спробуй ще раз.';
    }
}

document.addEventListener('keydown', (event) => {
    console.log(event.key , letters[currentLetterIndex])
    if (event.key === letters[currentLetterIndex]) {
        addRandomDiv();
        animateImageMovement();
        currentLetterIndex++;
        displayCurrentLetter();
    }
});

startGame();