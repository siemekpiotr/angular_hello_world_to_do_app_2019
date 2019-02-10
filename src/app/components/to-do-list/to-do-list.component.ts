import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Todo } from '../../interfaces/Todo';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})

export class ToDoListComponent implements OnInit {
  @ViewChild('someVar') someVar: ElementRef;
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  checkall: boolean;

  constructor() { }

  ngOnInit() {
    this.checkall = true;
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'Angular hello world',
        'completed': true,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Create repository',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'One more thing',
        'completed': false,
        'editing': false,
      },
    ];
  }

  addTodo(): void{
    if(this.todoTitle.trim().length === 0){
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false,
    })

    this.todoTitle ='';
    this.idForTodo++;
  }

  editTodo(todo: Todo):void{
    this.todos.forEach(todo => todo.editing = false);
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void{
    if(todo.title.trim().length === 0){
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void{
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void{
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  remaining(): number{
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted() : boolean{
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void{
    this.todos = this.todos.filter(todo => !todo.completed);
    this.someVar.nativeElement.checked = false;
  }

  checkAllTodos():void{
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }

  todosFiltered(): Todo[]{
    if(this.filter === 'all'){
      return this.todos
    } else if (this.filter === 'active'){
      return this.todos.filter(todo => !todo.completed)
    } else if (this.filter === 'completed'){
      return this.todos.filter(todo => todo.completed)
    }
    return this.todos;
  }
}