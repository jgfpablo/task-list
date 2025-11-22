import Swal from 'sweetalert2';
import { TaskPriority } from '../../Interfaces/tasks';

export function showTaskForm(): Promise<{
  title: string;
  desc: string;
  date: Date;
  priority: TaskPriority;
}> {
  return Swal.fire({
    title: 'New task',
    html: `
      <input id="swal-input-title" class="swal2-input" placeholder="Title">
      <input id="swal-input-desc" class="swal2-input" placeholder="Description">
      <input id="swal-input-date" class="swal2-input" type="datetime-local"></input>
      <div class="flex justify-center">
        <select id="swal-input-priority" class="swal2-input text-center border-none  text-gray-400" placeholder="Priority">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>
    
    `,
    showCancelButton: true,
    confirmButtonText: 'Save Task',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const title = (
        document.getElementById('swal-input-title') as HTMLInputElement
      ).value;
      const desc = (
        document.getElementById('swal-input-desc') as HTMLInputElement
      ).value;
      const dateValue = (
        document.getElementById('swal-input-date') as HTMLInputElement
      ).value;
      const priority = (
        document.getElementById('swal-input-priority') as HTMLSelectElement
      ).value;
      const dueDate = new Date(dateValue);

      if (!title || !desc || !dueDate || !priority) {
        Swal.showValidationMessage(
          'All fields are required. Please complete them to create a task.'
        );
        return false;
      }
      return { title, desc, dueDate, priority };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      Swal.fire({
        title: '¡Saved!',
        text: 'The task was created successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      return result.value;
    }
    return null;
  });
}
