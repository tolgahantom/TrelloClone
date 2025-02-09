import { Component } from '@angular/core';
import { GroupComponent } from '../group/group.component';
import { GroupService } from '../../services/group.service';
import { Group } from '../../model/group.model';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [GroupComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  groups: Group[] = [];
  constructor(private groupService: GroupService) {
    this.groupService.getAllGroup().subscribe((data) => (this.groups = data));
  }
}
