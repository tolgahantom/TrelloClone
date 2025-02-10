import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group } from '../model/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupList = new BehaviorSubject<Group[]>([]);

  constructor(private supabaseService: SupabaseService) {
    this.loadGroups();
  }

  private async loadGroups() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('groups')
      .select('*');

    if (error) {
      console.error('Grupları yüklerken hata oluştu:', error);
    } else {
      this.groupList.next(data || []);
    }
  }

  getAllGroup(): Observable<Group[]> {
    return this.groupList.asObservable();
  }

  async addNewGroup(group: Group) {
    const { error } = await this.supabaseService
      .getClient()
      .from('groups')
      .insert([group]);

    if (error) {
      console.error('Grup eklerken hata oluştu:', error);
    } else {
      this.loadGroups();
    }
  }

  async deleteGroup(groupId: number) {
    const { error } = await this.supabaseService
      .getClient()
      .from('groups')
      .delete()
      .eq('id', groupId);

    if (error) {
      console.error('Grup silerken hata oluştu:', error);
    } else {
      this.loadGroups();
    }
  }
}
