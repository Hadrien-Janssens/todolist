const renderTask = (task) => {
  return `<li class="list-group-item d-flex justify-content-between"><div><input type="checkbox" name='${
    task.task.id
  }' class="me-3" ${task.task.taskCheck ? "checked" : ""} /><label For=""> ${
    task.task.taskName
  }</label></div><button id="${
    task.task.id
  }"  class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></li>`;
};

export default renderTask;
