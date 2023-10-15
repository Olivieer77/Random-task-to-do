const customTasks = [];
const completedCustomTasks = [];
const historyList = [];
const customTaskInput = document.getElementById("customTaskInput");
const customTaskList = document.getElementById('customTaskList');
const addCustomTaskButton = document.getElementById("addCustomTask");
const AddError = document.querySelector('.Add-error');
const completedCountElement = document.getElementById("completedCount");
const taskHistoryElement = document.getElementById("taskHistory");

function createIcon(iconText, iconClass, clickHandler) {
    const icon = document.createElement("span");
    icon.textContent = iconText;
    icon.className = iconClass;
    icon.addEventListener("click", clickHandler);
    return icon;
}

function deleteCustomTask(taskText, listItem) {
    const taskIndex = customTasks.indexOf(taskText);
    if (taskIndex !== -1) {
        customTasks.splice(taskIndex, 1);
        listItem.remove();
        updateCompletedCount();
        displayTaskHistory();
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
                listItem.querySelector(".task-text").textContent = newTaskText;
                updateCompletedCount();
            }
        }
    }
}

function completeCustomTask(taskText, listItem) {
    const taskSpan = listItem.querySelector(".task-text");
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

    updateCompletedCount();
    displayTaskHistory();
}

function updateCompletedCount() {
    completedCountElement.textContent = completedCustomTasks.length;
}

function displayTaskHistory() {
    taskHistoryElement.innerHTML = "";

    for (const completedTask of completedCustomTasks) {
        const historyItem = document.createElement("li");
        historyItem.textContent = completedTask;
        taskHistoryElement.appendChild(historyItem);
    }
}

function addCustomTaskToList(taskText) {
    if (taskText && !customTasks.includes(taskText)) {
        customTasks.push(taskText);

        const customTaskElement = document.createElement('li');
        customTaskElement.classList.add('custom-task');
        customTaskElement.appendChild(createIcon("✔️", "complete-icon", () => completeCustomTask(taskText, customTaskElement)));

        const taskSpan = document.createElement('span');
        taskSpan.classList.add('task-text');
        taskSpan.textContent = taskText;
        customTaskElement.appendChild(taskSpan);

        customTaskElement.appendChild(createIcon("✏️", "edit-icon", () => editCustomTask(taskText, customTaskElement)));
        customTaskElement.appendChild(createIcon("🗑️", "delete-icon", () => deleteCustomTask(taskText, customTaskElement)));
        customTaskList.appendChild(customTaskElement);

        customTaskInput.value = "";
        AddError.textContent = '';
    } else {
        AddError.textContent = 'Error insert task name';
    }
}

addCustomTaskButton.addEventListener('click', () => {
    const taskText = customTaskInput.value.trim();
    addCustomTaskToList(taskText);
});