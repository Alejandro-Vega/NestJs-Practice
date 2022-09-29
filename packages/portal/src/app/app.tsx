import { useCallback, useRef } from 'react';
import { useTodos } from '@todo-app/data-access';

export function App() {
  const { todos, addTodo, toggleTodo } = useTodos();
  const textInputRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(async () => {
    if (!textInputRef.current) {
      return;
    }
    await addTodo(textInputRef.current.value);
    textInputRef.current.value = '';
  }, [addTodo]);

  const onToggle = useCallback(
    async (id: number) => {
      await toggleTodo(id);
    },
    [toggleTodo]
  );

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
