import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<{
    isOpen: boolean;
    groupId?: string;
  }>({
    isOpen: false,
    groupId: undefined,
  });
  modalState$ = this.modalState.asObservable();

  open(groupId: string) {
    this.modalState.next({ isOpen: true, groupId });
  }

  close() {
    this.modalState.next({ isOpen: false, groupId: undefined });
  }
}
