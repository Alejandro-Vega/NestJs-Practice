import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ICreateTodoDto, IUpdateTodoDto } from '@todo-app/shared-types';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('GetAllTodos')
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post('CreateTodo') // POST http://localhost:3333/api/CreateTodo
  async createTodo(@Body() dto: ICreateTodoDto) {
    return this.todoService.createTodo(dto);
  }

  @Post('UpdateTodo') // POST http://localhost:3333/api/UpdateTodo
  updateTodoStatus(@Body() dto: IUpdateTodoDto) {
    return this.todoService.updateTodo(Number(dto.id), dto);
  }
}
