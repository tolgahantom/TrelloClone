import { Component, Input, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';

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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskList = this.taskService.getAllTasks(this.group.id);
  }

  addNewTask() {
    const newTask: Task = {
      id: this.taskList.length + 1,
      title: 'New Task',
      statusId: 1,
      groupId: this.group.id,
    };
    this.taskService.addNewTask(newTask);
    this.taskList.push(newTask);
  }
}
