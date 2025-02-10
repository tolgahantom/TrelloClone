import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

export interface Status {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private statuses = new BehaviorSubject<Status[]>([]);

  constructor(private supabaseService: SupabaseService) {
    this.fetchStatuses();
  }

  getAllStatuses(): Observable<Status[]> {
    return this.statuses.asObservable();
  }

  async fetchStatuses(): Promise<void> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('status')
      .select('*');

    if (error) {
      console.error('Statüleri alırken hata oluştu:', error.message);
      return;
    }

    this.statuses.next(data || []);
  }
}
