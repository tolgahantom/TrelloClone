import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  title: string = '';
  status: string = '';
  isvisible: boolean = false;
  groupId: any = undefined;

  constructor(
    private modalService: ModalService,
    private taskService: TaskService
  ) {
    this.modalService.modalState$.subscribe((state) => {
      this.isvisible = state.isOpen;
      this.groupId = state.groupId;
    });
  }

  close() {
    this.modalService.close();
  }

  addNewTask() {
    const task = {
      id: Date.now(),
      title: this.title,
      statusId: +this.status,
      groupId: this.groupId,
    };

    this.taskService.addNewTask(task);
    this.title = '';
    this.status = '';
    this.modalService.close();
  }
}
