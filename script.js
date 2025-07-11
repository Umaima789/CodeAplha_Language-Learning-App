// Authentication UI toggling
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const authTitle = document.getElementById('auth-title');
const authForm = document.getElementById('auth-form');
const authBtn = document.getElementById('auth-btn');
const toggleAuth = document.getElementById('toggle-auth');

let isLogin = true; // track mode: login or signup

function setupToggleLink() {
  const toggleLink = document.getElementById('toggle-link');
  toggleLink.addEventListener('click', () => {
    isLogin = !isLogin;
    if (isLogin) {
      authTitle.innerText = 'Login';
      authBtn.innerText = 'Login';
      toggleAuth.innerHTML = `Don't have an account? <span id="toggle-link">Sign Up</span>`;
    } else {
      authTitle.innerText = 'Sign Up';
      authBtn.innerText = 'Sign Up';
      toggleAuth.innerHTML = `Already have an account? <span id="toggle-link">Login</span>`;
    }
    setupToggleLink(); // Re-attach event listener for new toggle-link span
  });
}

setupToggleLink();

// Fake user data storage (for demo)
const users = [];

authForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (isLogin) {
    // login logic: check if user exists with email/password
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      alert('Login successful!');
      showApp();
    } else {
      alert('Invalid credentials. Please try again.');
    }
  } else {
    // signup logic: check if email already used
    if (users.some(u => u.email === email)) {
      alert('Email already registered.');
      return;
    }
    users.push({ email, password });
    alert('Sign up successful! You can now login.');
    isLogin = true;
    authTitle.innerText = 'Login';
    authBtn.innerText = 'Login';
    toggleAuth.innerHTML = `Don't have an account? <span id="toggle-link">Sign Up</span>`;
    setupToggleLink();
  }
});

// Show app container & hide auth form
function showApp() {
  authContainer.classList.add('hidden');
  appContainer.classList.remove('hidden');
  loadFlashcard(0);
}

// Logout function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    authContainer.classList.remove('hidden');
    appContainer.classList.add('hidden');
  }
}

// Vocabulary flashcards data (expanded)
const flashcards = [
  {
    word: 'Hello',
    translation: 'Hola',
    partOfSpeech: 'Interjection',
    meaning: 'Used to greet someone.',
    example: 'Hello! How are you?'
  },
  {
    word: 'Book',
    translation: 'Libro',
    partOfSpeech: 'Noun',
    meaning: 'A set of pages bound together containing text or pictures.',
    example: 'I am reading a book.'
  },
  {
    word: 'Run',
    translation: 'Correr',
    partOfSpeech: 'Verb',
    meaning: 'To move swiftly on foot.',
    example: 'She runs every morning.'
  },
  {
    word: 'Beautiful',
    translation: 'Hermoso',
    partOfSpeech: 'Adjective',
    meaning: 'Pleasing the senses or mind aesthetically.',
    example: 'The sunset is beautiful.'
  },
  {
    word: 'Quickly',
    translation: 'Rápidamente',
    partOfSpeech: 'Adverb',
    meaning: 'At a fast speed.',
    example: 'He finished his work quickly.'
  }
];

let currentFlashcardIndex = 0;

function loadFlashcard(index) {
  const card = flashcards[index];
  document.getElementById('flashcard-front').innerText = card.word;
  const back = document.getElementById('flashcard-back');
  back.querySelector('.translation').innerText = card.translation;
  back.querySelector('.part-of-speech').innerText = card.partOfSpeech;
  back.querySelector('.meaning').innerText = card.meaning;
  back.querySelector('.example').innerText = card.example;
  document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
  document.getElementById('flashcard').classList.toggle('flipped');
}

function nextCard() {
  currentFlashcardIndex++;
  if (currentFlashcardIndex >= flashcards.length) currentFlashcardIndex = 0;
  loadFlashcard(currentFlashcardIndex);
}

// Tabs switching
function openTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// Lessons
function nextLesson() {
  document.getElementById('lesson-content').innerText = "Lesson 2: Asking Questions.";
}

// Quiz
function selectOption(btn, isCorrect) {
  const buttons = btn.parentElement.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  document.getElementById('nextQuizBtn').style.display = 'inline-block';
  document.getElementById('quiz-result').innerText = isCorrect ? "Correct! 🎉" : "Oops! Try again.";
}

function nextQuiz() {
  document.getElementById('quiz-question').innerText = "Translate 'Hello' to Spanish.";
  const options = document.getElementById('quiz-options');
  options.innerHTML = `
    <button onclick="selectOption(this, true)">Hola</button>
    <button onclick="selectOption(this, false)">Bonjour</button>
    <button onclick="selectOption(this, false)">Ciao</button>
    <button onclick="selectOption(this, false)">Hallo</button>
  `;
  // Hide next button and clear result for new question
  document.getElementById('nextQuizBtn').style.display = 'none';
  document.getElementById('quiz-result').innerText = '';
  // Enable all buttons
  options.querySelectorAll('button').forEach(btn => btn.disabled = false);
}
