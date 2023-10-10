const tasks = {
    all: [
    "train for 1 hour",
    "stretch for 30 minutes",
    "go to the gym",
    "Idź na spacer przez 30 minut.",
    "train for 1 hour",
    "stretch for 30 minutes",
    "Idź na spacer przez 30 minut.",
    "medytuj",
    "napisz za co jesteś wdzięczny",
    "Zadzwoń do przyjaciela i porozmawiaj przez telefon.",
    "Read a book for 30 minutes",
    "Nauka obcego języka",
    "Znajdź nowy przepis i przygotuj nowe danie.",
    ],

     fitness:  [
        "train for 1 hour",
        "stretch for 30 minutes",
        "go to the gym",
        "Idź na spacer przez 30 minut.",
    ],
    
     creativity:  [
        "zapisuj pomysly jakies",
        "rób jakieś inne głoptki",
        "Napisz dziennik przez 15 minut.",
        "Posprzątaj swój pokój.",
    
    ],
    
     rest:  [
        "medytuj",
        "napisz za co jesteś wdzięczny",
        "Zadzwoń do przyjaciela i porozmawiaj przez telefon.",
        "Read a book for 30 minutes",
    ],
    
     study:  [
        "Nauka obcego języka",
        "Znajdź nowy przepis i przygotuj nowe danie.",
    ],
}

const taskDisplay = document.querySelector(".task");
const categoryButtons = document.querySelectorAll(".category-button");
const expandCategory = document.querySelector('.category-expand');
const shareButton = document.getElementById("shareButton");

function generateRandomTask(category = "all") {
    const categoryTasks = tasks[category];
    if (!categoryTasks) return;

    const randomIndex = Math.floor(Math.random() * categoryTasks.length);
    taskDisplay.textContent = categoryTasks[randomIndex];
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