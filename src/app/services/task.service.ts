import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[] = [
    { id: 1, title: 'Task1', statusId: 1, groupId: 3 },
    { id: 2, title: 'Task2', statusId: 2, groupId: 1 },
    { id: 3, title: 'Task3', statusId: 3, groupId: 1 },
    { id: 4, title: 'Task4', statusId: 3, groupId: 2 },
  ];

  constructor() {}

  getAllTasks(id?: number): Task[] {
    if (id) {
      return this.taskList.filter((t) => t.groupId === id);
    }
    return this.taskList;
  }

  addNewTask(task: Task): void {
    this.taskList.push(task);
    console.log(this.taskList);
  }
}
