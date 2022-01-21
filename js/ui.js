const modalBackground = document.querySelector(".modal-background");
const modalContainer = document.querySelector(".modal-container");

const messages = document.querySelector(".mensajes");
const getPostDataPath = "https://todo-app-rest-api-node.herokuapp.com/api/todos";

function openModal() {
  modalBackground.classList.add("show-modal-background");
  modalContainer.classList.add("show-modal");
}

function closeModal() {
  modalBackground.classList.remove("show-modal-background");
  modalContainer.classList.remove("show-modal");
}


function crearTodo(todo) {
  const divTodo = document.createElement("DIV");

  divTodo.innerHTML = `
    <div class="todo animate__animated animate__backInRight">
        <h2>${todo.titulo}</h2>
        <p>${todo.descripcion}</p>
        <div class="todo-actions-container">
        <button class="btnUpdate" data-id="${todo.id}"><i class='fas fa-pen'></i></button>
        <button class="btnCheck" data-id="${todo.id}"><i class='fas fa-check'></i></button>
        </div>    
    </div>
    `;

  const btnUpdate = divTodo.querySelector(".btnUpdate");
  const btnCheck = divTodo.querySelector(".btnCheck");

  const dataTodo = {
    titulo: todo.titulo,
    descripcion: todo.descripcion,
    terminada: 1,
  };

  btnUpdate.addEventListener("click", () => {
    openModal();
    btnSendData.innerText = "Modificar";
    inputId.value = todo.id;
    inputTitulo.value = todo.titulo;
    inputDescripcion.value = todo.descripcion;
  });
  btnCheck.addEventListener("click", () => {
    checkTodo(`https://todo-app-rest-api-node.herokuapp.com/api/todos/${todo.id}`, dataTodo);
  });

  return divTodo;
}

function mostrarMensaje(mensaje) {
  messages.classList.add("show-message");
  messages.innerText = mensaje;
  setTimeout(() => {
    messages.classList.remove("show-message");
    messages.innerText = "";
  }, 1500);
}

async function deleteTodo(url) {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  loadData(getPostDataPath);
  mostrarMensaje("Tarea eliminada");
}

async function checkTodo(url, todo) {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  //console.log(await response.json());
  loadData(getPostDataPath);
  mostrarMensaje("Tarea marcada como terminda");
}
