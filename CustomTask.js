const customTasks = []

const customTaskInput = document.getElementById("customTaskInput");
const customTaskList = document.getElementById('customTaskList');
const addCustomTaskButton = document.getElementById("addCustomTask");
const AddError = document.querySelector('.Add-error');


function addCustomTaskToList(taskText) {
    const customTaskElement = document.createElement('li');

    const taskSpan = document.createElement('span')
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
                    let completeIcon = listItem.querySelector(".complete-icon");
    
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

                    if (!completeIcon) {
                        completeIcon = createIcon("✔️", "complete-icon", () => {
                            completeCustomTask();
                        });
                        listItem.appendChild(completeIcon);
                    }
                }
            }
        }
    }

    function completeCustomTask(taskSpan) {
        taskSpan.classList.toggle("completed");
    }

    customTaskElement.appendChild(taskSpan);
    customTaskElement.appendChild(createIcon("🗑️", "delete-icon", deleteCustomTask));
    customTaskElement.appendChild(createIcon("✏️", "edit-icon", () => {
        editCustomTask(taskText, customTaskElement);
    }));
    customTaskElement.appendChild(createIcon("✔️", "complete-icon", () => {
        completeCustomTask(taskSpan)
    }));
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