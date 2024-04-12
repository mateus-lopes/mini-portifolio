function addTask() {
  var input = document.getElementById("task-input");
  var task = input.value.trim();

  if (task !== "") {
    var listItem = document.createElement("li");
    listItem.textContent = task;
    listItem.style = "display: block;";

    listItem.addEventListener("click", function () {
      this.classList.toggle("completed");
    });

    var deleteButton = document.createElement("span");
    deleteButton.textContent = "❌";
    deleteButton.className = "delete";
    deleteButton.onclick = function () {
      listItem.remove();
      toggleNoTasksMessage();
    };

    listItem.appendChild(deleteButton);
    document.getElementById("todo-list").appendChild(listItem);

    input.value = "";

    toggleNoTasksMessage();
  } else {
    alert("Você não digitou nenhuma tarefa!");
  }
}

function toggleNoTasksMessage() {
  var noTasksMessage = document.getElementById("no-tasks");
  var taskList = document.getElementById("todo-list");

  if (taskList.children.length > 1) {
    noTasksMessage.style.display = "none";
  } else {
    noTasksMessage.style.display = "block";
  }
}
