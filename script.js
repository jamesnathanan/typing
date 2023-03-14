const testParagraph = document.querySelector('#test-paragraph');
const userInput = document.querySelector('#user-input');
const startButton = document.querySelector('#start-button');
const testResults = document.querySelector('#test-results');
const testResultsWpm = document.querySelector('#test-results-wpm');
const testResultsAccuracy = document.querySelector('#test-results-accuracy');
const testResultsTime = document.querySelector('#test-results-time');

let testRunning = false;
let testStartTime, testEndTime, testTimeTaken;
let testErrors = 0;
let testCharactersTyped = 0;

// Function to generate a random test paragraph
function generateTestParagraph() {
  const testParagraphs = [
    'The quick brown fox jumps over the lazy dog.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'The rain in Spain falls mainly on the plain.',
    'She sells seashells by the seashore.',
    'It was a dark and stormy night; the rain fell in torrents, except at occasional intervals, when it was checked by a violent gust of wind which swept up the streets (for it is in London that our scene lies), rattling along the housetops, and fiercely agitating the scanty flame of the lamps that struggled against the darkness.'
  ];
  return testParagraphs[Math.floor(Math.random() * testParagraphs.length)];
}

// Function to start the test
function startTest() {
  if (testRunning) return;
  testRunning = true;
  testErrors = 0;
  testCharactersTyped = 0;
  testParagraph.textContent = generateTestParagraph();
  userInput.value = '';
  userInput.focus();
  startButton.textContent = 'Stop Test';
  testStartTime = Date.now();
}

// Function to stop the test
function stopTest() {
  if (!testRunning) return;
  testRunning = false;
  testEndTime = Date.now();
  testTimeTaken = (testEndTime - testStartTime) / 1000;
  const testWordsTyped = testParagraph.textContent.split(' ').length;
  const testWpm = Math.round((testWordsTyped / testTimeTaken) * 60);
  const testAccuracy = Math.round(((testCharactersTyped - testErrors) / testCharactersTyped) * 100);
  testResultsWpm.textContent = testWpm;
  testResultsAccuracy.textContent = testAccuracy + '%';
  testResultsTime.textContent = testTimeTaken.toFixed(2) + ' seconds';
  startButton.textContent = 'Start Test';
}

// Event listeners
userInput.addEventListener('input', () => {
  if (!testRunning) return;
  const testText = testParagraph.textContent.slice(0, userInput.value.length);
  testCharactersTyped = testText.length;
  if (userInput.value === testText) {
    testParagraph.classList.add('text-success');
    testParagraph.classList.remove('text-danger');
  } else {
    testParagraph.classList.add('text-danger');
    testParagraph.classList.remove('text-success');
    testErrors++;
  }
});

startButton.addEventListener('click', () => {
  if (testRunning) {
    stopTest();
  } else {
    startTest();
  }
});
