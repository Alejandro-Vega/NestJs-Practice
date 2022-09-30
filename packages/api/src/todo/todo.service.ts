import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateTodoDto, IUpdateTodoDto } from '@todo-app/shared-types';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private readonly todoRepo: Repository<TodoEntity>) {}

  getAllTodos(): Promise<Array<TodoEntity>> {
    return this.todoRepo.find();
  }

  async createTodo(todo: ICreateTodoDto): Promise<TodoEntity> {
    const newTodo = this.todoRepo.create(todo);
    if (!newTodo) {
      throw new HttpException('Todo could not be created', HttpStatus.BAD_REQUEST);
    }
    await this.todoRepo.save(newTodo);
    return newTodo;
  }

  async updateTodo(id: number, dto: IUpdateTodoDto): Promise<TodoEntity> {
    await this.todoRepo.update(id, dto);
    const updatedTodo = await this.todoRepo.findOneBy({ id });

    if (!updatedTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      return;
    }
    return updatedTodo;
  }
}
