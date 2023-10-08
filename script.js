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

const customTasks = []

function generateRandomTask(category = "all") {
    const categoryTasks = tasks[category];
    if (!categoryTasks) return;

    const randomIndex = Math.floor(Math.random() * categoryTasks.length);
    const randomTask = categoryTasks[randomIndex];
    document.querySelector(".task").textContent = randomTask;
}

const categoryButtons = document.querySelectorAll(".category-button");
categoryButtons.forEach(button => {
    button.addEventListener("click", event => {
        const selectedCategory = event.target.getAttribute("data-category");
        generateRandomTask(selectedCategory);
    })
});

generateRandomTask(); 

const expandCategory = document.querySelector('.category-expand')
expandCategory.addEventListener('click', () => {
    categoryButtons.forEach(e => {
        e.classList.toggle('visible')
    })
})


const customTaskInput = document.getElementById("customTaskInput");
const customTaskList = document.getElementById('customTaskList');
const addCustomTaskButton = document.getElementById("addCustomTask");

function addCustomTaskToList(taskText) {
    const customTaskElement = document.createElement('li');
    customTaskElement.textContent = taskText;

    const deleteIcon = document.createElement("span");
    deleteIcon.textContent = "🗑️"; 
    deleteIcon.className = "delete-icon";

    deleteIcon.addEventListener("click", () => {
        deleteCustomTask(taskText);
        customTaskElement.remove();
    });

    const editIcon = document.createElement("span");
    editIcon.textContent = "✏️"; 
    editIcon.className = "edit-icon";
    editIcon.addEventListener("click", () => {
        editCustomTask(taskText, customTaskElement);
    });

    customTaskElement.appendChild(deleteIcon);
    customTaskElement.appendChild(editIcon);

    customTaskList.appendChild(customTaskElement);
}

function deleteCustomTask(taskText) {
    const taskIndex = customTasks.indexOf(taskText);
    if (taskIndex !== -1) {
        customTasks.splice(taskIndex, 1);
    }
}

function editCustomTask(oldTaskText, listItem) {
    const newTaskText = prompt("Edytuj zadanie:", oldTaskText);
    if (newTaskText !== null) {
        const taskIndex = customTasks.indexOf(oldTaskText);
        if (taskIndex !== -1) {
            customTasks[taskIndex] = newTaskText;
            listItem.textContent = newTaskText;
            
              // Zaktualizuj tekst w spanie
              listItem.textContent = newTaskText;

            // Sprawdź, czy istnieją ikony edycji i usuwania
            let deleteIcon = listItem.querySelector(".delete-icon");
            let editIcon = listItem.querySelector(".edit-icon");

            if (!deleteIcon) {
                deleteIcon = document.createElement("span");
                deleteIcon.textContent = "🗑️"; 
                deleteIcon.className = "delete-icon";
                deleteIcon.addEventListener("click", () => {
                    deleteCustomTask(newTaskText);
                    listItem.remove();
                });
                listItem.appendChild(deleteIcon);
            }

            if (!editIcon) {
                editIcon = document.createElement("span");
                editIcon.textContent = "✏️"; 
                editIcon.className = "edit-icon";
                editIcon.addEventListener("click", () => {
                    editCustomTask(newTaskText, listItem);
                });
                listItem.appendChild(editIcon);
            }
        }
    }
}

const AddError = document.querySelector('.Add-error')
addCustomTaskButton.addEventListener('click', () => {
    const taskText = customTaskInput.value.trim();
    if (taskText && !customTasks.includes(taskText)) {
        customTasks.push(taskText);
        addCustomTaskToList(taskText);
        customTaskInput.value = "";
        AddError.textContent = '';
    } else {
        AddError.textContent = 'Error insert task name';
    }
    
});

customTaskList.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN" && event.target.className === "delete-icon") {
        const taskText = event.target.parentElement.textContent;
        const taskIndex = customTasks.indexOf(taskText);
        if (taskIndex !== -1) {
            customTasks.splice(taskIndex, 1);
            event.target.parentElement.remove();
        }
    }
});


function shareTask(taskText) {
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

const shareButton = document.getElementById("shareButton");
shareButton.addEventListener('click', () => {
    const taskText = document.querySelector(".task").textContent;
    shareTask(taskText);
});