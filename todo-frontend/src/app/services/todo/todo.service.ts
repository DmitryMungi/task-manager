import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodo } from '../../types/todo.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/todos`;

  public getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.apiUrl);
  }

  public createTodo(title: string): Observable<ITodo> {
    return this.http.post<ITodo>(this.apiUrl, { title });
  }

  public deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public updateTodo(id: string, data: Partial<ITodo>): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.apiUrl}/${id}`, data);
  }
}
