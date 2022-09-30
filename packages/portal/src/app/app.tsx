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
import { EnumTodoStatus, ICreateTodoDto, ITodo } from '@todo-app/shared-types';

const defaultTodo: ITodo = {
  id: null,
  title: '',
  status: EnumTodoStatus[EnumTodoStatus.unfinished]
};

export function App() {
  const { todos, createTodo, updateTodoStatus } = useTodos();
  const [todo, setTodo] = useState<ITodo>(defaultTodo);

  const onAddTodo = useCallback(async () => {
    if (!todo) {
      return;
    }
    await createTodo(todo as ICreateTodoDto);
    setTodo(defaultTodo);
  }, [createTodo, todo]);

  const onToggle = useCallback(
    async (todo: ITodo) => {
      if (!todo.id) {
        return;
      }
      await updateTodoStatus(
        todo.id,
        todo.status === EnumTodoStatus[EnumTodoStatus.unfinished]
          ? EnumTodoStatus[EnumTodoStatus.done]
          : EnumTodoStatus[EnumTodoStatus.unfinished]
      );
    },
    [updateTodoStatus]
  );

  const onTodoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodo((todo) => ({ ...todo, title: e.target.value }));
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField value={todo.title ?? ''} onChange={onTodoChange} fullWidth />
          <Button variant="contained" onClick={onAddTodo} sx={{ px: 5 }}>
            Add
          </Button>
        </Stack>
        <List>
          {todos?.map((todo: ITodo) => (
            <ListItem key={todo.id} disablePadding>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={todo.status === 'done'} onChange={() => onToggle(todo)} />
                  }
                  label={todo.title}
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
