import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { EnumTodoStatus, ICreateTodoDto, ITodo, IUpdateTodoDto } from '@todo-app/shared-types';

export function useTodos() {
  const [todos, setTodos] = useState<Array<ITodo>>();

  const getAllTodos = useCallback(async () => {
    const res = await axios.get<Array<ITodo>>('http://localhost:3333/api/todo/GetAllTodos');
    if (!res?.data?.length) {
      return;
    }
    setTodos(res.data);
  }, []);

  const createTodo = useCallback(
    async (todo: ICreateTodoDto) => {
      if (!todo) {
        return;
      }
      await axios.post('http://localhost:3333/api/todo/CreateTodo', todo);
      getAllTodos();
    },
    [getAllTodos]
  );

  const updateTodo = useCallback(async (id: number, dto: IUpdateTodoDto) => {
    const res = await axios.post('http://localhost:3333/api/todo/UpdateTodo', dto);
    if (!res?.data?.length) {
      return;
    }
    setTodos(res.data);
  }, []);

  const updateTodoStatus = useCallback(async (id: number, status: EnumTodoStatus) => {
    const res = await axios.post('http://localhost:3333/api/todo/UpdateTodo', { id, status });
    if (!res?.data) {
      return;
    }
    setTodos((todos) => todos?.map((todo) => (todo.id === res.data.id ? res.data : todo)));
  }, []);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return {
    todos,
    getAllTodos,
    createTodo,
    updateTodoStatus
  };
}
