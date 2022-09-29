import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ITodo } from '@todo-app/shared-types';

export function App() {
  const [todos, setTodos] = useState<Array<ITodo>>();
  const textInputRef = useRef<HTMLInputElement>(null);

  const getTodos = useCallback(async () => {
    const res = await axios.get<Array<ITodo>>('http://localhost:3333/api');
    if (!res?.data?.length) {
      return;
    }
    setTodos(res.data);
  }, []);

  const onAddTodo = useCallback(async () => {
    if (!textInputRef.current) {
      return;
    }
    await axios.post('http://localhost:3333/api', {
      text: textInputRef.current.value,
    });
    textInputRef.current.value = '';
    getTodos();
  }, [getTodos]);

  const onToggle = useCallback(
    async (id: number) => {
      await axios.post('http://localhost:3333/api/setDone', {
        id,
        done: !todos?.find((todo) => todo.id === id)?.done,
      });
    },
    [todos, getTodos]
  );

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" onChange={() => onToggle(todo.id)} />
            {todo.text}
          </div>
        ))}
      </div>
      <>
        <input ref={textInputRef} />
        <button onClick={onAddTodo}>Add</button>
      </>
    </>
  );
}

export default App;
