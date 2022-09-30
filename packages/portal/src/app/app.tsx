import { ChangeEvent, useCallback, useState } from 'react';
import { useTodos } from '@todo-app/data-access';
import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Container } from '@mui/material';

export function App() {
  const { todos, addTodo, toggleTodo } = useTodos();
  const [todo, setTodo] = useState<string>('');

  const onAddTodo = useCallback(async () => {
    if (!todo) {
      return;
    }
    await addTodo(todo);
    setTodo('');
  }, [addTodo, todo]);

  const onToggle = useCallback(
    async (id: number) => {
      await toggleTodo(id);
    },
    [toggleTodo]
  );

  const onTodoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField value={todo} onChange={onTodoChange} fullWidth />
          <Button variant="contained" onClick={onAddTodo} sx={{ px: 5 }}>
            Add
          </Button>
        </Stack>
        <List>
          {todos?.map((todo) => (
            <ListItem key={todo.id} disablePadding>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={todo.done}
                      onChange={() => onToggle(todo.id)}
                    />
                  }
                  label={todo.text}
                />
              </FormGroup>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Container>
  );
}

export default App;
