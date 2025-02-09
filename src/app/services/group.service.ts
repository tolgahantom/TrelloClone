import { Injectable } from '@angular/core';
import { Group } from '../model/group.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupList = new BehaviorSubject<Group[]>([
    { id: 1, title: 'Group 1' },
    { id: 2, title: 'Group 2' },
    { id: 3, title: 'Group 3' },
  ]);

  constructor(private taskService: TaskService) {}

  getAllGroup(): Observable<Group[]> {
    return this.groupList.asObservable();
  }

  addNewGroup(group: Group) {
    const updatedList = [...this.groupList.value, group];
    this.groupList.next(updatedList);
  }

  deleteGroup(groupId: number) {
    const updatedList = this.groupList.value.filter(
      (group) => group.id !== groupId
    );
    this.groupList.next(updatedList);
    this.taskService.deleteTasksByGroupId(groupId);
  }
}
