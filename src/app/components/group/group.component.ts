import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { ModalService } from '../../services/modal.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
  @Input() group: any;
  taskList: Task[] = [];

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTasks(this.group.id).subscribe((tasks) => {
      console.log(tasks);
      this.taskList = tasks;
    });
  }

  addNewTask() {
    this.modalService.open(this.group.id);
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.group.id);
  }
}
