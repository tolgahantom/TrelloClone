import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task: any;
  status: any[] = [];

  constructor(
    private taskService: TaskService,
    private statusService: StatusService
  ) {
    this.statusService.getAllStatuses().subscribe((data) => {
      this.status = data;
      console.log(this.status);
    });
  }

  updateStatusId(id: number) {
    this.taskService.updateStatus(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}
