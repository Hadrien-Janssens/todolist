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

const renderApp = async () => {
  const tasklocal = await getTaskFromLocalStorage("tasks");
  document.querySelector("#app").innerHTML = `
 ${navbar()}
    <div class="container py-4 px-3 mx-auto">
      <h1>Todo list</h1>
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

  // ajouter la tache à l'evenement submit
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let tasklocal = await getTaskFromLocalStorage("tasks");
    addTask(tasklocal);
    renderApp();
  });

  // supprimer la tache a l'evenement click sur la bouton supprimer
  const buttons = Array.from(document.querySelectorAll("li button"));
  buttons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      await handleDelete(e.currentTarget.id);
      renderApp();
    });
  });

  // toggle de la checkBox a l'evenement  click sur l'input checkbox
  const checkInput = Array.from(document.querySelectorAll("li input"));
  checkInput.forEach((checkInput) => {
    checkInput.addEventListener("click", async (e) => {
      await handlecheck(e.target.name);
      renderApp();
    });
  });
};
renderApp();
