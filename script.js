// Função para a textarea ficar do tamanho do texto escrito
const textarea = document.getElementById('task-input');

textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Redefine a altura para o tamanho padrão
  this.style.height = this.scrollHeight + 'px'; // Ajusta a altura com base no scrollHeight
});


// Adicionar uma tarefa à lista
function addTask(text) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('div');
    const areaCheck = document.createElement('div');
    const areaText = document.createElement('div');
    const areaBotoes = document.createElement('div');
    const checkbox = document.createElement('button');
    const taskText = document.createElement('p');
    const deleteButton = createDeleteButton(taskItem);
    const editButton = createEditButton(taskItem, taskText);
    const upButton = document.createElement('button');
    const downButton = document.createElement('button');

    taskText.textContent = text;
    checkbox.classList.add("fa-solid", "fa-check");

    upButton.classList.add("fa-solid", "fa-arrow-up");
    downButton.classList.add("fa-solid", "fa-arrow-down");

    upButton.classList.add("move", "up");
    downButton.classList.add("move", "down");

    taskItem.classList.add("tarefa");
    taskItem.setAttribute("draggable", "true");

    areaCheck.appendChild(checkbox);
    taskItem.appendChild(areaCheck);
    areaCheck.classList.add("areaCheck");

    areaText.appendChild(taskText);
    taskItem.appendChild(areaText);
    areaText.classList.add("areaText");

    taskList.appendChild(taskItem);

    taskItem.appendChild(areaBotoes);
    areaBotoes.appendChild(editButton);
    areaBotoes.appendChild(upButton);
    areaBotoes.appendChild(downButton);
    areaBotoes.appendChild(deleteButton);
    areaBotoes.classList.add("areaBotoes");

    // Adicionar a classe 'completed' ao clicar no checkbox
    checkbox.addEventListener('click', function () {
        if (taskItem.classList.contains('completed')) {
            taskItem.classList.remove('completed');
        } else {
            taskItem.classList.add('completed');
        }
        mudaBotaoEditar();

    });
    // fim adicionar classe completed

    // Função para mudar o ícone do botão editar
    function mudaBotaoEditar() {
        if (taskItem.classList.contains('completed')) {
            checkbox.classList.remove("fa-check");
            checkbox.classList.add("fa-solid", "fa-ban");
        } else {
            checkbox.classList.remove("fa-ban");
            checkbox.classList.add("fa-solid", "fa-check");
        }
    }
    // Fim mudança ícone editar

    // Event listener para mover a tarefa para cima
    upButton.addEventListener('click', function () {
        const previousItem = taskItem.previousElementSibling;
        if (previousItem) {
            taskItem.parentNode.insertBefore(taskItem, previousItem);
            updateTaskPositions();
        }
    });
    // Fim mover tarefa para cima

    // Event listener para mover a tarefa para baixo
    downButton.addEventListener('click', function () {
        const nextItem = taskItem.nextElementSibling;
        if (nextItem) {
            taskItem.parentNode.insertBefore(nextItem, taskItem);
            updateTaskPositions();
        }
    });
    // Fim mover a tarefa para baixo

    // Função para criar um botão de edição de tarefa
    function createEditButton(taskItem, taskText) {
        const editButton = document.createElement('button');
        editButton.classList.add("fa-solid", "fa-pen-to-square");

        editButton.addEventListener('click', function () {

            areaCheck.removeChild(checkbox);

            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('edit-text');
            input.id='task-input';
            input.value = taskText.textContent;

            taskItem.setAttribute("draggable", "false");

            const saveButton = document.createElement('button');
            saveButton.classList.add("fa-solid","fa-floppy-disk");

            const cancelButton = document.createElement('button');
            cancelButton.classList.add("fa-solid","fa-xmark");

            // Armazena o texto original antes de iniciar a edição
            const originalText = taskText.textContent;

            saveButton.addEventListener('click', function () {

                const shouldEdit = confirm('Deseja realmente editar esta tarefa?');
                if (!shouldEdit) {
                    return;
                }
                saveChanges();
                taskItem.setAttribute("draggable", "true");
                areaCheck.appendChild(checkbox);
            });

            cancelButton.addEventListener('click', function () {
                cancelEditing();
                taskItem.setAttribute("draggable", "true");
                areaCheck.appendChild(checkbox);
            });

            input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    const shouldEdit = confirm('Deseja realmente editar esta tarefa?');
                    if (!shouldEdit) {
                        return;
                    }
                    saveChanges();
                    taskItem.setAttribute("draggable", "true");
                    areaCheck.appendChild(checkbox);
                }
            });
       
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                  cancelEditing();
                  taskItem.setAttribute('draggable', 'true');
                  areaCheck.appendChild(checkbox);
                }
              });

            areaText.replaceChild(input, taskText);
            areaBotoes.removeChild(editButton);
            areaBotoes.removeChild(deleteButton);
            areaBotoes.appendChild(saveButton);
            areaBotoes.appendChild(cancelButton);
            areaBotoes.removeChild(upButton);
            areaBotoes.removeChild(downButton);

            function saveChanges() {
                taskText.textContent = input.value;
                areaText.replaceChild(taskText, input);
                areaBotoes.removeChild(saveButton);
                areaBotoes.removeChild(cancelButton);
                areaBotoes.appendChild(editButton);
                areaBotoes.appendChild(upButton);
                areaBotoes.appendChild(downButton);
                areaBotoes.appendChild(deleteButton);
            }

            function cancelEditing() {
                taskText.textContent = originalText; // Restaura o texto original
                areaText.replaceChild(taskText, input);
                areaBotoes.removeChild(saveButton);
                areaBotoes.removeChild(cancelButton);
                areaBotoes.appendChild(editButton);
                areaBotoes.appendChild(upButton);
                areaBotoes.appendChild(downButton);
                areaBotoes.appendChild(deleteButton);
            }

        });

        return editButton;
    }
    // Fim botão de edição de tarefa
}
// Fim adicionar uma tarefa à lista

// Função para criar um botão de exclusão de tarefa
function createDeleteButton(taskItem) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '';
    deleteButton.classList.add('fa-solid', 'fa-trash');

    deleteButton.addEventListener('click', function () {
        // Exibir uma caixa de diálogo de confirmação
        const confirmation = confirm('Tem certeza que deseja excluir esta tarefa?');

        if (confirmation) {
            taskItem.remove();
        }
    });

    return deleteButton;
}
// Fim exclusão de tarefa

// Obter o valor da textarea e adicionar as tarefas ao pressionar Enter
document.getElementById('task-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita quebra de linha na textarea

        const textarea = document.getElementById('task-input');
        const tasks = textarea.value.split('\n');

        tasks.forEach(function (task) {
            if (task.trim() !== '') {
                addTask(task);
            }
        });

        textarea.value = '';
    }
});
// Fim adicionar as tarefas ao pressionar Enter

// Obter o valor da textarea e adicionar as tarefas ao pressionar o botão
document.getElementById('add').addEventListener('click', function () {
    const textarea = document.getElementById('task-input');
    const tasks = textarea.value.split('\n');

    tasks.forEach(function (task) {
        if (task.trim() !== '') {
            addTask(task);
        }
    });

    textarea.value = '';
});
// Fim adicionar as tarefas ao pressionar o botão

// Excluir todas as tarefas ao pressionar o botão
document.getElementById('delete-all').addEventListener('click', function () {
    // Exibir uma caixa de diálogo de confirmação
    const confirmation = confirm('Tem certeza que deseja excluir todas as tarefas?');

    if (confirmation) {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
    }
});
// Fim exclusão todas tarefas