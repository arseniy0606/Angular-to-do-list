import { Component } from '@angular/core';
import {Todo} from './to-do';
import {TodoDataService} from './tododataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodo: Todo = new Todo();
  totalSelected = 0;

  markAllText = 'Mark All';


  constructor(private todoDataService: TodoDataService) {
  }

  addTodo() {
    if (this.newTodo.title) {
      this.todoDataService.addTodo(this.newTodo);
      this.newTodo = new Todo();
    }
  }

  markAll() {
    this.todoDataService.markAll();
  }

  toggleMarkAll() {
    this.todoDataService.toggleMarkAll();
    this.changeMarkText();
  }

  changeMarkText() {
    if (this.todoDataService.allMarked)
      this.markAllText = 'Unmark All';
    else
      this.markAllText = 'Mark All';
  }

  toggleSelect(todo) {
    this.todoDataService.toggleSelect(todo);
    this.changeMarkText();
  }

  selectToDo(todo) {
    this.totalSelected = this.todoDataService.selectToDo(todo);
  }

  clearAll() {
    this.todoDataService.clearAll();
    this.changeMarkText();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  clearSelected() {
    this.todoDataService.deleteSelected();
    this.changeMarkText();
  }

  get selectedCount() {
    return this.todoDataService.getTotalSelected();
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }
}
