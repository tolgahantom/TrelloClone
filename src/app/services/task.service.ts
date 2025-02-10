import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskList = new BehaviorSubject<Task[]>([]);

  constructor(private supabaseService: SupabaseService) {
    this.loadTasks();
  }

  private async loadTasks() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('tasks')
      .select('*');

    if (error) {
      console.error('Taskleri yüklerken hata oluştu:', error);
    } else {
      this.taskList.next(data || []);
    }
  }

  getAllTasks(groupId?: number): Observable<Task[]> {
    return this.taskList
      .asObservable()
      .pipe(
        map((tasks) =>
          groupId ? tasks.filter((t) => t.groupId === groupId) : tasks
        )
      );
  }

  async addNewTask(task: Task) {
    const { error } = await this.supabaseService
      .getClient()
      .from('tasks')
      .insert([task]);

    if (error) {
      console.error('Task eklerken hata oluştu:', error);
    } else {
      this.loadTasks();
    }
  }

  async updateStatus(taskId: number): Promise<void> {
    const { data: task, error: taskError } = await this.supabaseService
      .getClient()
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (taskError) {
      console.error('Task bulunamadı:', taskError);
      return;
    }

    const newStatusId = task.statusId < 3 ? task.statusId + 1 : 3;

    console.log(`Task ID: ${taskId}, Yeni Status ID: ${newStatusId}`);

    const { error: updateError } = await this.supabaseService
      .getClient()
      .from('tasks')
      .update({ statusId: newStatusId })
      .eq('id', taskId);

    if (updateError) {
      console.error('Statü güncellenirken hata oluştu:', updateError);
      return;
    }

    console.log(
      `Task ID: ${taskId} güncellendi, yeni statusId: ${newStatusId}`
    );

    await this.loadTasks();
  }

  async deleteTask(id: number) {
    const { error } = await this.supabaseService
      .getClient()
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Task silerken hata oluştu:', error);
    } else {
      this.loadTasks();
    }
  }
}
