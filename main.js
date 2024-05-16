// Import our custom CSS

import { buttonContainer } from "./components/buttonContainer";
import { addTaskSuccesMessage } from "./components/modale";
import navbar from "./components/navbar";
import renderTask from "./components/task";
import { getTaskFromLocalStorage } from "./functions/localStorageManager";
import {
  handleDelete,
  addTask,
  handlecheck,
  nombreDeTask,
} from "./functions/taskManager";
import "/style.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

const tasklocal = await getTaskFromLocalStorage("tasks");
const renderApp = async (tasklocal) => {
  document.querySelector("#app").innerHTML = `
 ${navbar()}
    <div class="container py-4 px-3 mx-auto">
      <h1>To do list</h1>
      <form action="" class="d-flex flex-column align-items-end">
        <input type="text" placeholder="ajouter un tâche ici ..." id="task" class="form-control fst-italic" />
        <button class="btn btn-primary my-3" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal" >Ajouter</button>
        ${addTaskSuccesMessage()}
      </form>


<div class="d-flex align-items-center justify-content-between mt-5">
      <div>
        <h2>Liste des tâches</h2>
        ${await buttonContainer()}
        </div>
      
</div>

    </button>
      <ul class="list-group">
        ${tasklocal.map((task) => renderTask(task)).join("")}
      </ul>
    </div>
`;
  //---------------event sur le formulaire-----------------
  // ajouter la tache à l'evenement submit
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let tasklocal = await getTaskFromLocalStorage("tasks");
    addTask(tasklocal);
    renderApp(tasklocal);
  });

  //---------------event sur la liste-----------------
  // supprimer la tache a l'evenement click sur la bouton supprimer
  const deleteButtons = Array.from(document.querySelectorAll("li button"));
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      await handleDelete(e.currentTarget.id);
      const newTaskLocal = await getTaskFromLocalStorage("tasks");
      renderApp(newTaskLocal);
    });
  });

  // toggle de la checkBox a l'evenement  click sur l'input checkbox
  const checkInput = Array.from(document.querySelectorAll("li input"));
  checkInput.forEach((checkInput) => {
    checkInput.addEventListener("click", async (e) => {
      await handlecheck(e.target.name);
      const newTaskLocal = await getTaskFromLocalStorage("tasks");
      renderApp(newTaskLocal);
    });
  });

  //---------------les bouttons de tri-----------------
  //tache terminées
  const finishedTaskBtn = document.querySelector("#btn-container .btn-success");
  finishedTaskBtn.addEventListener("click", async () => {
    let tasklocal = await getTaskFromLocalStorage("tasks");
    let newTasklocal = [];
    tasklocal.forEach((el) => {
      if (el.task.taskCheck == true) {
        newTasklocal.push(el);
      }
    });
    renderApp(newTasklocal);
  });
  // toutes les taches
  const allTaskBtn = document.querySelector("#btn-container .btn-primary");
  allTaskBtn.addEventListener("click", async () => {
    let tasklocal = await getTaskFromLocalStorage("tasks");
    renderApp(tasklocal);
  });
  // taches pas terminées
  const notFinishedTaskBtn = document.querySelector(
    "#btn-container .btn-warning"
  );
  notFinishedTaskBtn.addEventListener("click", async () => {
    let tasklocal = await getTaskFromLocalStorage("tasks");
    let newTasklocal = [];
    tasklocal.forEach((el) => {
      if (el.task.taskCheck == false) {
        newTasklocal.push(el);
      }
    });
    renderApp(newTasklocal);
  });
};
//rendre l'application
renderApp(tasklocal);
