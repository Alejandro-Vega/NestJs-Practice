import { Injectable } from '@nestjs/common';
import { ITodo } from '@todo-app/shared-types';

@Injectable()
export class AppService {
  private todos: Array<ITodo> = [];

  getData(): Array<ITodo> {
    return this.todos;
  }

  add(text: string): void {
    this.todos.push({
      id: this.todos.length,
      text,
      done: false,
    });
  }

  setDone(id: number, done: boolean): Array<ITodo> {
    this.todos = this.todos.map((todo) => ({
      ...todo,
      done: todo.id === id ? done : todo.done,
    }));
    return this.todos;
  }
}
