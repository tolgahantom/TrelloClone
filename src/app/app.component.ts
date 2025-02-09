import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContentComponent } from './components/content/content.component';
import { GroupService } from './services/group.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Group } from './model/group.model';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    ContentComponent,
    FormsModule,
    CommonModule,
    ModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isVisible: boolean = false;
  newGroupName: string = '';

  constructor(private groupService: GroupService) {}

  addNewGroup() {
    const group: Group = {
      id: Date.now(),
      title: this.newGroupName,
    };
    this.groupService.addNewGroup(group);
    this.newGroupName = '';
    this.isVisible = false;
  }

  cancelVisible() {
    this.isVisible = false;
    this.newGroupName = '';
  }
}
