import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ITodo } from '@todo-app/shared-types';

export function useTodos() {
  const [todos, setTodos] = useState<Array<ITodo>>();

  const getTodos = useCallback(async () => {
    const res = await axios.get<Array<ITodo>>('http://localhost:3333/api');
    if (!res?.data?.length) {
      return;
    }
    setTodos(res.data);
  }, []);

  const addTodo = useCallback(
    async (text: string) => {
      if (!text) {
        return;
      }
      await axios.post('http://localhost:3333/api', {
        text,
      });
      getTodos();
    },
    [getTodos]
  );

  const toggleTodo = useCallback(
    async (id: number) => {
      await axios.post('http://localhost:3333/api/setDone', {
        id,
        done: !todos?.find((todo) => todo.id === id)?.done,
      });
    },
    [todos]
  );

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return {
    todos,
    getTodos,
    addTodo,
    toggleTodo,
  };
}
