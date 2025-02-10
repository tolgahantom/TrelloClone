import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  title: string = '';
  selectedStatusId: number = -1;
  isvisible: boolean = false;
  groupId: any = undefined;
  statusList: any[] = [];

  constructor(
    private modalService: ModalService,
    private taskService: TaskService,
    private statusService: StatusService
  ) {
    this.modalService.modalState$.subscribe((state) => {
      this.isvisible = state.isOpen;
      this.groupId = state.groupId;
    });

    this.statusService.getAllStatuses().subscribe((data) => {
      this.statusList = data;
    });
  }

  close() {
    this.modalService.close();
  }

  addNewTask() {
    if (this.selectedStatusId === -1) {
      alert('Seçilemez Durum');
      return;
    }
    const task = {
      id: Date.now(),
      title: this.title,
      statusId: this.selectedStatusId,
      groupId: this.groupId,
    };

    this.taskService.addNewTask(task);
    this.title = '';
    this.selectedStatusId = -1;
    this.modalService.close();
  }
}
