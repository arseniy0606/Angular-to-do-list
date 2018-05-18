import { Injectable } from '@angular/core';
import {Todo} from './to-do';

@Injectable()
export class TodoDataService {

  lastId = 0;

  todos: Todo[] = [];
  selectedTodos: Todo[] = [];

  allMarked = false;

  constructor() {
  }

  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTotalSelected(): number {
    return this.selectedTodos.length;
  }

  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  toggleSelect(todo: Todo) {

    let updatedTodo;

    if (todo.complete) {
      this.selectedTodos.splice(this.selectedTodos.indexOf(todo), 1);
      this.todos[this.todos.indexOf(todo)].complete = false;
    }
    else {
      this.selectedTodos.push(todo);
      this.todos[this.todos.indexOf(todo)].complete = true;
    }

    this.setMarkToggle();

    return updatedTodo;
  }

  selectToDo(todo: Todo) {
    this.selectedTodos.push(todo);
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return this.selectedTodos.length;
  }

  clearAll() {
    this.selectedTodos = [];
    this.todos = [];
    this.setMarkToggle();
  }

  setMarkToggle() {
    if (!this.selectedTodos.length)
      this.allMarked = false;
  }

  deleteSelected() {
    this.todos = this.todos.filter((n) => {
      return this.selectedTodos.indexOf(n) == -1;
    });
    this.selectedTodos = [];

    this.setMarkToggle();
  }

  toggleMarkAll() {
    this.allMarked = !this.allMarked;

    if (this.allMarked) {
      this.markAll();
    }
    else {
      this.unMarkAll();
    }
  }

  unMarkAll() {
    this.todos.filter(todo => {
      todo.complete = false;
    });
    this.selectedTodos = [];

  }

  markAll() {
    this.todos.filter(todo => {
      todo.complete = true;
    });

    this.selectedTodos = Object.assign([], this.todos);

  }

  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

}
