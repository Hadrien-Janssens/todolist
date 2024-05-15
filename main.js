// Import our custom CSS
import renderTask from "./components/task";
import "/style.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

let tasklocal = JSON.parse(localStorage.getItem("tasks"));

if (tasklocal === null) {
  tasklocal = [];
}

document.querySelector("#app").innerHTML = `
    <div class="container py-4 px-3 mx-auto">
      <h1>Todo list</h1>
      <form action="" class="d-flex flex-column align-items-end">
        <input type="text" placeholder="ajouter un tâche ici" id="task" class="form-control" />
        <button class="btn btn-primary my-3" type="submit" >Ajouter</button>
      </form>
      <h2>Liste des tâches</h2>
      <ul class="list-group">
        ${tasklocal.map((task) => renderTask(task)).join("")}
      </ul>

     
    </div>
`;

//ajouter une tache
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // value de ma tache
  const taskValue = document.querySelector("#task").value;
  //id
  const id = Date.now();
  let task = {
    task: {
      id: id,
      taskName: taskValue,
      taskCheck: false,
    },
  };
  tasklocal.push(task);
  tasklocal = JSON.stringify(tasklocal);
  localStorage.setItem("tasks", tasklocal);
  window.location.reload();
});

//delete event

const buttons = Array.from(document.querySelectorAll("li button"));

const handleDelete = (id) => {
  let newtab = [];
  tasklocal.forEach((task) => {
    if (task.task.id != id) {
      newtab.push(task);
    }
  });
  tasklocal = [];
  tasklocal = newtab;
  tasklocal = JSON.stringify(tasklocal);
  localStorage.setItem("tasks", tasklocal);
  window.location.reload();
};

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleDelete(e.target.id);
  });
});

// tache deja effectuée
const checkInput = Array.from(document.querySelectorAll("li input"));

const handlecheck = (name) => {
  console.log("check");
  tasklocal.forEach((el) => {
    if (el.task.id == name) {
      el.task.taskCheck = !el.task.taskCheck;
      tasklocal = JSON.stringify(tasklocal);
      localStorage.setItem("tasks", tasklocal);
      window.location.reload();
    }
  });
};
checkInput.forEach((input) => {
  input.addEventListener("click", (e) => {
    handlecheck(e.target.name);
  });
});

const modal = () => {};