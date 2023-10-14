const customTasks = []

const customTaskInput = document.getElementById("customTaskInput");
const customTaskList = document.getElementById('customTaskList');
const addCustomTaskButton = document.getElementById("addCustomTask");
const AddError = document.querySelector('.Add-error');


function addCustomTaskToList(taskText) {
    const customTaskElement = document.createElement('li');
    customTaskElement.classList.add('custom-task')
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text')
    taskSpan.textContent = taskText;

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
        let completeIcon = listItem.querySelector(".complete-icon");
        if (!completeIcon) {
            completeIcon = createIcon("✔️", "complete-icon", () => {
                completeCustomTask(completeIcon);
            });
            listItem.appendChild(completeIcon);
        }

        const newTaskText = prompt("Edytuj zadanie:", oldTaskText);
        if (newTaskText !== null) {
            if (customTasks.includes(newTaskText)) {
                alert("Zadanie o tej nazwie już istnieje. Proszę wybrać inną nazwę.");
            } else {
                const taskIndex = customTasks.indexOf(oldTaskText);
                if (taskIndex !== -1) {
                    customTasks[taskIndex] = newTaskText;
                    listItem.textContent = newTaskText;
    
                    let editIcon = listItem.querySelector(".edit-icon");
                    let deleteIcon = listItem.querySelector(".delete-icon");
                   
                    if (!editIcon) {
                        editIcon = createIcon("✏️", "edit-icon", () => {
                            editCustomTask(newTaskText, listItem);
                        });
                        listItem.appendChild(editIcon);
                    }
                    if (!deleteIcon) {
                        deleteIcon = createIcon("🗑️", "delete-icon", () => {
                            deleteCustomTask(newTaskText);
                            listItem.remove();
                        });
                        listItem.appendChild(deleteIcon);
                    }
    
                    

                }
            }
        }
    }

    let historyList = [];
    let completedCustomTasks = [];

    function completeCustomTask(taskSpan) {
        if (!taskSpan.classList.contains("completed")) {
            taskSpan.classList.add("completed");
            customTaskElement.classList.add('completeBackground')
            historyList.push(taskSpan.textContent);
            completedCustomTasks.push(taskSpan.textContent);

            updateCompletedCount();
            displayTaskHistory();
        }
    }

    function updateCompletedCount() {
        const completedCountElement = document.getElementById("completedCount");
        completedCountElement.textContent = completedCustomTasks.length;
    }

    function displayTaskHistory() {
        const historyListElement = document.getElementById("taskHistory");
        historyListElement.innerHTML = "";
    
        for (const completedTask of completedCustomTasks) {
            const historyItem = document.createElement("li");
            historyItem.textContent = completedTask;
            historyListElement.appendChild(historyItem);
        }
    }


    customTaskElement.appendChild(createIcon("✔️", "complete-icon", () => {
        completeCustomTask(taskSpan);
    }));
    customTaskElement.appendChild(taskSpan);
    customTaskElement.appendChild(createIcon("✏️", "edit-icon", () => {
        editCustomTask(taskText, customTaskElement);
    }));
    customTaskElement.appendChild(createIcon("🗑️", "delete-icon", deleteCustomTask));
    customTaskList.appendChild(customTaskElement);
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



// zrobić error osobny na tą samą nazwę w dodawaniu taska