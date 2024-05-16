import {
  getTaskFromLocalStorage,
  sendTaskInLocalStorage,
} from "./localStorageManager";

//ajouter une tache
export const addTask = async (tasklocal) => {
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
  await sendTaskInLocalStorage("tasks", tasklocal);
};

//delete event
export const handleDelete = async (id) => {
  let tasklocal = await getTaskFromLocalStorage("tasks");
  let newtab = [];
  tasklocal.forEach((task) => {
    if (task.task.id !== parseInt(id)) {
      newtab.push(task);
    }
  });
  tasklocal = newtab;
  await sendTaskInLocalStorage("tasks", tasklocal);
};

export const handlecheck = async (name) => {
  let tasklocal = await getTaskFromLocalStorage("tasks");
  tasklocal.forEach((el) => {
    if (el.task.id === parseInt(name)) {
      el.task.taskCheck = !el.task.taskCheck;
      sendTaskInLocalStorage("tasks", tasklocal);
    }
  });
};

// gerer le nombre de tache
export const nombreDeTask = async () => {
  let tasklocal = await getTaskFromLocalStorage("tasks");
  const someOfTask = tasklocal.length;
  return someOfTask;
};

// gerer le nombre de tache terminée
export const someOfFinishedTask = async () => {
  let tasklocal = await getTaskFromLocalStorage("tasks");
  let workingArray = [];
  tasklocal.forEach((el) => {
    if (el.task.taskCheck == true) {
      workingArray.push(el);
    }
  });
  const someOfFinishedTask = workingArray.length;
  return someOfFinishedTask;
};

// gerer le nombre de tache a faire
export const someOfNotFinishedTask = async () => {
  let tasklocal = await getTaskFromLocalStorage("tasks");
  let workingArray = [];
  tasklocal.forEach((el) => {
    if (el.task.taskCheck == false) {
      workingArray.push(el);
    }
  });
  const someOfNotFinishedTask = workingArray.length;
  return someOfNotFinishedTask;
};
