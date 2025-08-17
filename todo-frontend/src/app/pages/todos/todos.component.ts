import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ITodo } from '../../types/todo.interface';
import { TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-todos',
  imports: [
    MatButtonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule,
    TodoItemComponent
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);

  todos = signal<ITodo[]>([]);
  loading = signal<boolean>(true);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required]
  });

  constructor(){
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    })
  }

  public addTodo(): void {
    if (this.form.invalid) return;

    const title: string = this.form.value.title;
    this.todoService.createTodo(title).subscribe({
      next: (newTodo) => {
        this.todos.update((current) => [newTodo, ...current]);
        this.form.reset(); // очистка формы после добавления
      },
      error: () => console.error('Ошибка добавления задачи')
    });
  }

  public deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos.update((current) => current.filter(todo => todo._id !== id));
      },
      error: () => console.error('Ошибка при удалении задачи')
    });
  }

  public toggleComplete(todo: ITodo): void {
    const updated = { ...todo, completed: !todo.completed };

    this.todoService.updateTodo(todo._id, { completed: updated.completed }).subscribe({
      next: () => {
        this.todos.update(current =>
          current.map(t => t._id === todo._id ? updated : t)
        );
      },
      error: () => console.error('Ошибка при обновлении completed')
    });
  }
}
