const renderTask = (task) => {
  return `
  <li class=" d-flex justify-content-between align-items-center my-2">
 

    <div class="input-group ">
  <div class="input-group-text">
    <input class="form-check-input mt-0 " type="checkbox" name='${
      task.task.id
    }' ${
    task.task.taskCheck ? "checked" : ""
  } value="" aria-label="Checkbox for following text input">
  </div>
  <label  class="form-control">${task.task.taskName}</label>
</div>

    <button id="${task.task.id}" class="btn btn-danger ms-3">
        <i class="fa-solid fa-trash-can"></i>
    </button>

  </li>`;
};

export default renderTask;
