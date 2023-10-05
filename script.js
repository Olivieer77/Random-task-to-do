const tasks = {
    all: [
    "train for 1 hour",
    "stretch for 30 minutes",
    "go to the gym",
    "Idź na spacer przez 30 minut.",
    "train for 1 hour",
    "stretch for 30 minutes",
    "go to the gym",
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
    
     learning:  [
        "Nauka obcego języka",
        "Znajdź nowy przepis i przygotuj nowe danie.",
    ],
    
}

const generateRandomTask = () => {
    const categorySelect = document.getElementById("categorySelect");
    const selectedCategory = categorySelect.value;

    const categoryTasks = tasks[selectedCategory];
    if (!categoryTasks) return;

    const randomIndex = Math.floor(Math.random() * categoryTasks.length);
    const randomTask = categoryTasks[randomIndex];
    document.querySelector(".task").textContent = randomTask;
}

const generateButton = document.querySelector(".generateRandomTask");
generateButton.addEventListener("click", generateRandomTask);

generateRandomTask();