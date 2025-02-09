import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskList = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Task1', status: 'yapılacak', groupId: 3 },
    { id: 2, title: 'Task2', status: 'yapılacak', groupId: 1 },
    { id: 3, title: 'Task3', status: 'yapıldı', groupId: 1 },
    { id: 4, title: 'Task4', status: 'sürüyor', groupId: 2 },
  ]);

  constructor() {}

  getAllTasks(id?: number): Observable<Task[]> {
    return this.taskList
      .asObservable()
      .pipe(
        map((tasks) => (id ? tasks.filter((t) => t.groupId === id) : tasks))
      );
  }
  addNewTask(task: Task): void {
    const updatedList = [...this.taskList.value, task];
    this.taskList.next(updatedList);
  }
  deleteTasksByGroupId(groupId: number) {
    const updatedList = this.taskList.value.filter(
      (task) => task.groupId !== groupId
    );
    this.taskList.next(updatedList);
  }
}
