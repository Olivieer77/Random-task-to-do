const customTasks = [];

const customTaskInput = document.getElementById("customTaskInput");
const customTaskList = document.getElementById('customTaskList');
const addCustomTaskButton = document.getElementById("addCustomTask");
const AddError = document.querySelector('.Add-error');
const completedCountElement = document.getElementById("completedCount");
const historyListElement = document.getElementById("taskHistory");
let completedCustomTasks = [];
let historyList = [];

function addCustomTaskToList(taskText) {
    const customTaskElement = document.createElement('li');
    customTaskElement.classList.add('custom-task');
    
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
        const newTaskText = prompt("Edit Task:", oldTaskText);
        if (newTaskText !== null) {
            if (customTasks.includes(newTaskText)) {
                alert("Task with this name already exists. Please choose a different name.");
            } else {
                const taskIndex = customTasks.indexOf(oldTaskText);
                if (taskIndex !== -1) {
                    customTasks[taskIndex] = newTaskText;
                    listItem.textContent = newTaskText;

                    let completeIcon = listItem.querySelector(".complete-icon");
                    let editIcon = listItem.querySelector(".edit-icon");
                    let deleteIcon = listItem.querySelector(".delete-icon");

                    if (!completeIcon) {
                        completeIcon = createIcon("✔️", "complete-icon", () => {
                            completeCustomTask(taskText, customTaskElement);
                        });
                        listItem.insertBefore(completeIcon, listItem.firstChild);
                    }

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

    // function completeCustomTask(taskText, listItem) {
    //     const taskSpan = listItem.querySelector(".task-text");
    //     if (!completedCustomTasks.includes(taskText)) {
    //         completedCustomTasks.push(taskText);
    //         taskSpan.classList.add('completed');
    //         listItem.classList.add('completeBackground');
    //         updateCompletedCount();
    //         displayTaskHistory();
    //     }
    // }
    

    function completeCustomTask(taskText, listItem) {
        const taskSpan = listItem.querySelector(".task-text");
    
        if (taskSpan) {
            const isCompleted = completedCustomTasks.includes(taskText);
    
            if (!isCompleted) {
                completedCustomTasks.push(taskText);
                taskSpan.classList.add('completed');
                listItem.classList.add('completeBackground');
            } else {
                const taskIndex = completedCustomTasks.indexOf(taskText);
                if (taskIndex !== -1) {
                    completedCustomTasks.splice(taskIndex, 1);
                    taskSpan.classList.remove('completed');
                    listItem.classList.remove('completeBackground');
                }
            }
        }
    
        updateCompletedCount();
        displayTaskHistory();
    }

    function updateCompletedCount() {
        completedCountElement.textContent = completedCustomTasks.length;
    }

    function displayTaskHistory() {
        historyListElement.innerHTML = "";
        for (const completedTask of completedCustomTasks) {
            const historyItem = document.createElement("li");
            historyItem.textContent = completedTask;
            historyListElement.appendChild(historyItem);
        }
    }

    customTaskElement.appendChild(createIcon("✔️", "complete-icon", () => {
        completeCustomTask(taskText, customTaskElement);
    }));

    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text');
    taskSpan.textContent = taskText;
    customTaskElement.appendChild(taskSpan);
    customTaskList.appendChild(customTaskElement);

    customTaskElement.appendChild(createIcon("✏️", "edit-icon", () => {
        editCustomTask(taskText, customTaskElement);
    }));
    customTaskElement.appendChild(createIcon("🗑️", "delete-icon", () => {
        deleteCustomTask(taskText);
        customTaskElement.remove();
    }));
  
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