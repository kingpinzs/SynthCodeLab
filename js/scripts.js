// Show the OS selection modal if the user hasn't chosen an OS
window.onload = function() {
    if (!localStorage.getItem('selectedOS')) {
        document.getElementById('osModal').style.display = 'block';
    } else {
        loadUserPreferences();
    }
};

// Function to handle OS selection
function selectOS(os) {
    localStorage.setItem('selectedOS', os);
    document.getElementById('osModal').style.display = 'none';
}

// Function to load user preferences and progress
function loadUserPreferences() {
    const os = localStorage.getItem('selectedOS');
    const lastLesson = localStorage.getItem('lastLesson');

    if (os) {
        console.log(`User is using ${os}`);
        // Apply any OS-specific preferences here
    }

    if (lastLesson) {
        window.location.href = lastLesson;
    }
}

// Function to update last lesson in localStorage
function updateLastLesson(lesson) {
    localStorage.setItem('lastLesson', lesson);
}

// Function to hide all sections except the overview
function hideAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
}

// Function to show a specific section
function showSection(sectionId) {
    hideAllSections();
    document.getElementById(sectionId).classList.add('active');
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(2); // remove leading slash and hash
            showSection(targetId);
        });
    });
});

// Example function to be called on quiz completion
function checkAnswers() {
    const form = document.getElementById('quizForm');
    const results = document.getElementById('results');
    const nextLesson = document.getElementById('nextLesson');
    let score = 0;

    fetch(`${window.baseUrl}data/quizzes.json`)
        .then(response => response.json())
        .then(data => {
            const quizId = 'lesson1'; // Use dynamic way to get the quiz ID based on the context
            const questions = data.quizzes[quizId];
            questions.forEach((question, index) => {
                const selected = form.querySelector(`input[name="q${index + 1}"]:checked`);
                if (selected && selected.value === question.answer) {
                    score++;
                } else {
                    results.innerHTML += `<p>Question ${index + 1}: Incorrect. Review the relevant section.</p>`;
                }
            });

            const totalQuestions = questions.length;
            results.innerHTML += `<p>Your score: ${score} out of ${totalQuestions}</p>`;

            if (score === totalQuestions) {
                nextLesson.style.display = 'block';
                updateLastLesson('/lessons/lesson2/'); // Update with the next lesson path
            }
        });
}

function updateLastLesson(lesson) {
    localStorage.setItem('lastLesson', lesson);
}

// Function to save preferences
function savePreferences() {
    const saveProgress = document.getElementById('saveProgress').checked;
    const osSelection = document.getElementById('osSelection').value;
    const languageSelection = document.getElementById('languageSelection').value;

    const preferences = {
        saveProgress: saveProgress,
        osSelection: osSelection,
        languageSelection: languageSelection
    };

    localStorage.setItem('preferences', JSON.stringify(preferences));
    alert('Preferences saved!');
}

// Function to load preferences
function loadPreferences() {
    const preferences = JSON.parse(localStorage.getItem('preferences'));

    if (preferences) {
        document.getElementById('saveProgress').checked = preferences.saveProgress;
        document.getElementById('osSelection').value = preferences.osSelection;
        document.getElementById('languageSelection').value = preferences.languageSelection;
    }
}

// Function to update last lesson in localStorage
function updateLastLesson(lesson) {
    const preferences = JSON.parse(localStorage.getItem('preferences'));

    if (preferences && preferences.saveProgress) {
        localStorage.setItem('lastLesson', lesson);
    }
}

// Function to load last lesson
function loadLastLesson() {
    const preferences = JSON.parse(localStorage.getItem('preferences'));

    if (preferences && preferences.saveProgress) {
        const lastLesson = localStorage.getItem('lastLesson');

        if (lastLesson) {
            window.location.href = lastLesson;
        }
    }
}

// Function to handle OS selection modal
function handleOSSelection() {
    if (!localStorage.getItem('selectedOS')) {
        document.getElementById('osModal').style.display = 'block';
    } else {
        loadPreferences();
    }
}

// Run this function on page load
window.onload = function() {
    handleOSSelection();
    loadPreferences();
    loadLastLesson();
};

// Example function to be called on quiz completion
function checkAnswers(quizId) {
    const form = document.getElementById('quizForm');
    const results = document.getElementById('results');
    const nextLesson = document.getElementById('nextLesson');
    let score = 0;

    fetch(`${window.baseUrl}data/quizzes.json`)
        .then(response => response.json())
        .then(data => {
            const questions = data.quizzes[quizId];
            questions.forEach((question, index) => {
                const selected = form.querySelector(`input[name="q${index + 1}"]:checked`);
                if (selected && selected.value === question.answer) {
                    score++;
                } else {
                    results.innerHTML += `<p>Question ${index + 1}: Incorrect. Review the relevant section.</p>`;
                }
            });

            const totalQuestions = questions.length;
            results.innerHTML += `<p>Your score: ${score} out of ${totalQuestions}</p>`;

            if (score === totalQuestions) {
                nextLesson.style.display = 'block';
                updateLastLesson(`${window.baseUrl}lessons/${quizId | nextLesson}.html`);
            }
        });
}
