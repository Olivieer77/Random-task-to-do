const tasks = {
    all: [
        "Train for 1 hour.",
        "Stretch for 30 minutes.",
        "Visit the gym.",
        "Bike for an hour.",
        "Do 30 minutes of cardio exercises.",
        "Run for 30 minutes.",
        "Go to the pool.",
        "Walk for 30 minut.",
        "Hold a plank for 2 minutes.",
        "Visit a squash court.",
        "Draw for 30 minutes.",
        "Posprzątaj swój pokój.",
        "Photograph nature.",
        "Graphic design.",
        "Keep a record of your ideas.",
        "Meditate for 20 minutes.",
        "Read a book for 30 minutes.",
        "Write down what you are grateful for.",
        "Take a walk in the park.",
        "Watch a film.",
        "Listen to music.",
        "Clean your room.",
        "Play with your dog outdoors.",
        "Learn a new language.",
        "Study cooking basics.",
        "Learn to play a musical instrument.",
        "Learn coding.",
        "Try new technology.",
        "Enroll in an online course.",
        // 
        "Try a new cooking recipe.",
        "Make a list of your goals.",
        "Visit an art exhibition.",
        "Listen to your favorite music.",
        "Buy fresh fruits and vegetables.",
        "Invite friends over for dinner.",

    ],

     fitness:  [
        "Train for 1 hour.",
        "Stretch for 30 minutes.",
        "Visit the gym.",
        "Bike for an hour.",
        "Do 30 minutes of cardio exercises.",
        "Run for 30 minutes.",
        "Go to the pool.",
        "Walk for 30 minut.",
        "Hold a plank for 2 minutes.",
        "Visit a squash court.",
    ],
    
     creativity:  [
        "Draw for 30 minutes.",
        "Photograph nature.",
        "Graphic design.",
        "Keep a record of your ideas.",
    ],
    
    relax:  [
        "Meditate for 20 minutes.",
        "Read a book for 30 minutes.",
        "Write down what you are grateful for.",
        "Take a walk in the park.",
        "Watch a film.",
        "Listen to music.",
        "Clean your room.",
        "Play with your dog outdoors."
    ],
    
     study:  [
        "Learn a new language.",
        "Study cooking basics.",
        "Learn to play a musical instrument.",
        "Learn coding.",
        "Try new technology.",
        "Enroll in an online course.",

    ],
}

const completedTasks = {
    all: [],
    fitness: [],
    creativity: [],
    relax: [],
    study: [],
};

const taskDisplay = document.querySelector(".task");
const categoryButtons = document.querySelectorAll(".category-button");
const expandCategory = document.querySelector('.category-expand');
const shareButton = document.getElementById("shareButton");

function generateRandomTask(category = "all") {
    const categoryTasks = tasks[category];
    if (!categoryTasks || categoryTasks.length === 0) {
        alert("No tasks available in this category.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * categoryTasks.length);
    const task = categoryTasks[randomIndex];
    categoryTasks.splice(randomIndex, 1); 
    completedTasks[category].push(task); 

    taskDisplay.textContent = task;
    // taskDisplay.textContent = categoryTasks[randomIndex];
}

function resetCategoryTasks() {
    for (const category in tasks) {
        tasks[category] = completedTasks[category].concat(tasks[category]);
        completedTasks[category] = [];
    }
}

categoryButtons.forEach(button => {
    button.addEventListener("click", event => {
        const selectedCategory = event.target.getAttribute("data-category");
        generateRandomTask(selectedCategory);
    });
});

generateRandomTask();

expandCategory.addEventListener('click', () => {
    categoryButtons.forEach(e => {
        e.classList.toggle('visible');
    });
    expandCategory.classList.toggle('expanded')
});



const completedRandomTasks = [];
const completedRandomTaskHistory = [];

function completeRandomTask(){
    const taskText = taskDisplay.textContent;
    if (!completedRandomTasks.includes(taskText)) {
        completedRandomTasks.push(taskText);
        completedRandomTaskHistory.push(taskText);
        updateCompletedCount();
        displayCompletedRandomTaskHistory();
        generateRandomTask();
    }
}

function updateCompletedCount() {
    const completedCountElement = document.getElementById("completedCount");
    completedCountElement.textContent = completedRandomTasks.length;
}

function displayCompletedRandomTaskHistory() {
    const completedRandomTaskHistoryList = document.querySelector(".history");
    completedRandomTaskHistoryList.innerHTML = "";

    for (const completedTask of completedRandomTaskHistory) {
        const historyItem = document.createElement("li");
        historyItem.textContent = completedTask;
        completedRandomTaskHistoryList.appendChild(historyItem);
    }
}


taskDisplay.addEventListener('click', completeRandomTask);





// udostępnianie
function shareCurrentTask() {
    const taskText = taskDisplay.textContent;
    if (navigator.share) {
        navigator.share({
            title: 'Random Task to do in your free time',
            text: taskText,
        })
        .then(() => console.log('Zadanie zostało udostępnione'))
        .catch((error) => console.error('Błąd podczas udostępniania: ', error));
    } else {
        alert('Twoja przeglądarka nie obsługuje funkcji udostępniania.');
    }
}

shareButton.addEventListener('click', shareCurrentTask);
