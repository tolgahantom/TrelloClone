import { Injectable } from '@angular/core';
import { Group } from '../model/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groupList: Group[] = [
    {
      id: 1,
      title: 'Group 1',
    },
    {
      id: 2,
      title: 'Group 2',
    },
    {
      id: 3,
      title: 'Group 3',
    },
  ];

  constructor() {}

  getAllGroup() {
    return this.groupList;
  }

  addNewGroup(group: Group) {
    this.groupList.push(group);
    console.log(this.groupList);
  }
}
