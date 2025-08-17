import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ITodo } from '../../../../types/todo.interface';

@Component({
  selector: 'app-todo-item',
  imports: [ 
    FormsModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  @Input({required: true})
  public todo!: ITodo;

  @Output()
  public removeEmit = new EventEmitter<string>();

  @Output()
  public compliteEmit = new EventEmitter<ITodo>();

  public deleteItem(): void {
    this.removeEmit.emit(this.todo._id);
  }

  public toggleCompleteEmit(): void {
    this.compliteEmit.emit(this.todo);
  }
}
