const modal = document.getElementById('modal');
const confirmButton = document.getElementById('yes');
const cancelButton = document.getElementById('no');

// Função para abrir o modal
function openModal() {
    modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    modal.style.display = 'none';
}

cancelButton.addEventListener('click', closeModal);


// Função para desabilitar a Textarea quando abrir a ediçao da tarefa
function DisableTextArea() {
    const botoes = document.getElementById('btn-principal');
    const textarea = document.getElementById('task-input');

    botoes.style.pointerEvents = 'none';
    textarea.style.pointerEvents = 'none';
    textarea.style.opacity = '.5';
}
// Fim função desabilitar

function EnableTextArea() {
    const textarea = document.getElementById('task-input');
    const botoes = document.getElementById('btn-principal');

    botoes.style.pointerEvents = 'auto';
    textarea.style.pointerEvents='auto';
    textarea.style.opacity = '1';
}

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

    taskText.textContent = text;
    checkbox.classList.add("fa-solid", "fa-check");

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
        checkCompletedTasks();
    });
    // fim adicionar classe completed

    // Função para verificar se todas as tarefas estão concluídas
    function checkCompletedTasks() {
        const allTasks = document.querySelectorAll('.tarefa');
        const completedTasks = document.querySelectorAll('.completed');
        let message = document.getElementById('completed-message');

        if (allTasks.length === completedTasks.length) {
            if (!message) {
                message = document.createElement('p');
                message.id = 'completed-message';
                message.textContent = `Você concluiu ${completedTasks.length} tarefas.`;
                taskList.appendChild(message);
                element.style.marginBottom = '10px';
            }
        } else {
            if (message) {
                taskList.removeChild(message);
            }
        }
    }
    // Fim verificar tarefas concluídas

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


    // Função para criar um botão de edição de tarefa
    function createEditButton(taskItem, taskText) {
        const editButton = document.createElement('button');
        editButton.classList.add("fa-solid", "fa-pen-to-square");

        editButton.addEventListener('click', function () {

            DisableTextArea();
            areaCheck.removeChild(checkbox);

            const input = document.createElement('textarea');
            input.type = 'text';
            input.id = 'task-input';
            input.classList.add('edit-text');
            input.value = taskText.textContent;

            taskItem.setAttribute("draggable", "false");

            const saveButton = document.createElement('button');
            saveButton.classList.add("fa-solid", "fa-floppy-disk");

            const cancelButton = document.createElement('button');
            cancelButton.classList.add("fa-solid", "fa-xmark");

            // Armazena o texto original antes de iniciar a edição
            const originalText = taskText.textContent;

            saveButton.addEventListener('click', function () {
                openModal();
                confirmButton.addEventListener('click', () => {
                    saveChanges();
                    taskItem.setAttribute("draggable", "true");
                    areaCheck.appendChild(checkbox);
                    closeModal();
                });
                cancelButton.addEventListener('click', closeModal);
            });

            cancelButton.addEventListener('click', function () {
                cancelEditing();
                taskItem.setAttribute("draggable", "true");
                areaCheck.appendChild(checkbox);
            });

            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    openModal();
                    confirmButton.addEventListener('click', () => {
                        saveChanges();
                        taskItem.setAttribute("draggable", "true");
                        areaCheck.appendChild(checkbox);
                        closeModal();
                    });
                    cancelButton.addEventListener('click', closeModal);
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

            function saveChanges() {
                taskText.textContent = input.value;
                areaText.replaceChild(taskText, input);
                areaBotoes.removeChild(saveButton);
                areaBotoes.removeChild(cancelButton);
                areaBotoes.appendChild(editButton);
                areaBotoes.appendChild(deleteButton);
                EnableTextArea();
            }

            function cancelEditing() {
                taskText.textContent = originalText; // Restaura o texto original
                areaText.replaceChild(taskText, input);
                areaBotoes.removeChild(saveButton);
                areaBotoes.removeChild(cancelButton);
                areaBotoes.appendChild(editButton);
                areaBotoes.appendChild(deleteButton);
                EnableTextArea();
            }

        });

        return editButton;
    }
    // Fim botão de edição de tarefa
    checkCompletedTasks();
}
// Fim adicionar uma tarefa à lista

// Função para criar um botão de exclusão de tarefa
function createDeleteButton(taskItem) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '';
    deleteButton.classList.add('fa-solid', 'fa-trash');

    deleteButton.addEventListener('click', function () {
        taskItem.remove();
    });

    return deleteButton;
}
// Fim exclusão de tarefa

// Obter o valor da textarea e adicionar as tarefas ao pressionar Enter
document.getElementById('task-input').addEventListener('keydown', function (event) {
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

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
});
// Fim exclusão todas tarefas

// Função para a textarea ficar do tamanho do texto escrito
const textarea = document.getElementById('task-input');

textarea.addEventListener('input', function () {
    this.style.height = 'auto'; // Redefine a altura para o tamanho padrão
    this.style.height = this.scrollHeight + 'px'; // Ajusta a altura com base no scrollHeight
});

// Fim função textarea tamanho

// Função para reordenar as tarefas com as bibliotecas jQuery e jQuery UI
$(function () {
    $("#task-list").sortable();
});
// Fim função reordenação

