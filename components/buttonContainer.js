import {
  nombreDeTask,
  someOfFinishedTask,
  someOfNotFinishedTask,
} from "../functions/taskManager";
import { button } from "./button";

export const buttonContainer = async () => {
  const someOfTask = await nombreDeTask();
  const FinishedTask = await someOfFinishedTask();
  const notFinishedTask = await someOfNotFinishedTask();

  return `
    <div class="my-3" id="btn-container">
${button("total", someOfTask, " btn-primary ")}
${button("à faire", notFinishedTask, " btn-warning ")}
${button("terminée", FinishedTask, " btn-success ")}
</div>
    `;
};
