const btnNewTodo = document.getElementById("btnNewTodo");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnSendData = document.getElementById("btnSendData");

const inputId = document.getElementById("inputId");
const inputTitulo = document.getElementById("inputTitulo");
const inputDescripcion = document.getElementById("inputDescripcion");

const todoContainer = document.querySelector(".todo-container");
const loaderContainer = document.querySelector(".loader-container");


btnNewTodo.addEventListener("click", ()=>{
  openModal();
  btnSendData.innerText="Agregar"
});

btnCloseModal.addEventListener("click", () => {
  closeModal();
  inputId.value = "0";
  inputTitulo.value = "";
  inputDescripcion.value = "";
});

btnSendData.addEventListener("click", async () => {
  if (inputId.value=='0') {
    const response = await fetch(getPostDataPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: inputTitulo.value,
        descripcion: inputDescripcion.value,
      }),
    });
    const addedTodo=await response.json()
    todoContainer.append( crearTodo(addedTodo) );
    
    mostrarMensaje("Nueva tarea agregada")
  }else{
    const response = await fetch(`https://todo-app-rest-api-node.herokuapp.com/api/todos/${inputId.value}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: inputTitulo.value,
        descripcion: inputDescripcion.value,
      }),
    })
    loadData(getPostDataPath);
    mostrarMensaje("Tarea modificada")
  }
  
  //console.log(await response.json());
  closeModal()
  inputId.value = "0";
  inputTitulo.value = "";
  inputDescripcion.value = "";
});


onload = loadData(getPostDataPath);

async function loadData(url) {
  const response = await fetch(url);
  const data = await response.json();
   loaderContainer.classList.add("hide");
  if (data.length > 0) {
    for (const element of data) {
      todoContainer.append( crearTodo(element) );
    }

  } else {
    todoContainer.innerHTML = "<p>No hay tareas para mostrar</p>";
  }
}





