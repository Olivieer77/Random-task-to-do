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

const taskDisplay = document.querySelector(".task");
const categoryButtons = document.querySelectorAll(".category-button");
const expandCategory = document.querySelector('.category-expand');
const customTaskInput = document.getElementById("customTaskInput");
const customTaskList = document.getElementById('customTaskList');
const addCustomTaskButton = document.getElementById("addCustomTask");
const AddError = document.querySelector('.Add-error');
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
});

// custom task
function addCustomTaskToList(taskText) {
    const customTaskElement = document.createElement('li');
    customTaskElement.textContent = taskText;

    function createIcon(iconText, iconClass, clickHandler) {
        const icon = document.createElement("span");
        icon.textContent = iconText;
        icon.className = iconClass;
        icon.addEventListener("click", clickHandler);
        return icon;
    }

    function deleteCustomTask() {
        const taskIndex = customTasks.indexOf(taskText);
        if (taskIndex !== -1) {
            customTasks.splice(taskIndex, 1);
            customTaskElement.remove();
        }
    }

    function editCustomTask(oldTaskText, listItem) {
        const newTaskText = prompt("Edytuj zadanie:", oldTaskText);
        if (newTaskText !== null) {
            if (customTasks.includes(newTaskText)) {
                alert("Zadanie o tej nazwie już istnieje. Proszę wybrać inną nazwę.");
            } else {
                const taskIndex = customTasks.indexOf(oldTaskText);
                if (taskIndex !== -1) {
                    customTasks[taskIndex] = newTaskText;
                    listItem.textContent = newTaskText;
    
                    let deleteIcon = listItem.querySelector(".delete-icon");
                    let editIcon = listItem.querySelector(".edit-icon");
    
                    if (!deleteIcon) {
                        deleteIcon = createIcon("🗑️", "delete-icon", () => {
                            deleteCustomTask(newTaskText);
                            listItem.remove();
                        });
                        listItem.appendChild(deleteIcon);
                    }
    
                    if (!editIcon) {
                        editIcon = createIcon("✏️", "edit-icon", () => {
                            editCustomTask(newTaskText, listItem);
                        });
                        listItem.appendChild(editIcon);
                    }
                }
            }
        }
    }

    customTaskElement.appendChild(createIcon("🗑️", "delete-icon", deleteCustomTask));
    customTaskElement.appendChild(createIcon("✏️", "edit-icon", () => {
        editCustomTask(taskText, customTaskElement);
    }));
    customTaskList.appendChild(customTaskElement);
}

function deleteCustomTask(taskText) {
    const taskIndex = customTasks.indexOf(taskText);
    if (taskIndex !== -1) {
        customTasks.splice(taskIndex, 1);
    }
}

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

shareButton.addEventListener('click', shareCurrentTask);