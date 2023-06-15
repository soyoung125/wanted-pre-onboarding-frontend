import { Button, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TodoInterface {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number,
}

const TodoContainer = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('data') || '');
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [todoInput, setTodoInput] = useState('');
  const [newTodoInput, setNewTodoInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!data) {
        navigate('/signin', { replace: true });
      } else {
        try {
          const todosData = await getData();
          console.log(todosData);
          setTodos(todosData);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    fetchData();
  }, []);
  

  
  const getData = async (): Promise<TodoInterface[]> => {
    try {
      const response = await axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
  const createTodo = async () => {
    if (data) {
      try {
        const response = await axios.post('https://www.pre-onboarding-selection-task.shop/todos', { todo: todoInput }, {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
            'Content-Type': 'application/json'
          }
        });
        const newData = response.data;
        setTodos(todos.concat(newData));
        setTodoInput('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = (newData: TodoInterface) => {
    axios.put(`https://www.pre-onboarding-selection-task.shop/todos/${newData.id}`,
      { todo: newData.todo, isCompleted: newData.isCompleted },
      {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
          'Content-Type': 'application/json'
        }
      }).then((res) => { setTodos(todos.map((todo) => todo.id === newData.id ? res.data : todo)) })
      .catch((err) => console.log(err));
  }

  const handleDelete = (id: number) => {
    axios.delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        }
      }).then((res) => { setTodos(todos.filter((todo) => todo.id !== id)) })
      .catch((err) => console.log(err));
  }

  const handleTodoEdit = (todo: TodoInterface) => {
    if (selectedTodo === todo.id) {
      handleUpdate({...todo, todo: newTodoInput})
      setSelectedTodo(0);
    } else {
      setSelectedTodo(todo.id);
      setNewTodoInput(todo.todo)
    }
  }

  return (
    <>
      <TextField
        id="todo-input"
        placeholder='할 일을 입력하세요.'
        variant="standard"
        inputProps={{  'data-testid': "new-todo-input"  }}
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <Button  data-testid="new-todo-input" onClick={createTodo}>추가하기</Button>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            disablePadding
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.isCompleted}
                tabIndex={-1}
                disableRipple
                onClick={() => handleUpdate({...todo, isCompleted: !todo.isCompleted})}
              />
            </ListItemIcon>

            {selectedTodo === todo.id
              ? <>
                <TextField
                  size='small'
                  value={newTodoInput}
                  onChange={(e) => setNewTodoInput(e.target.value)}
                  inputProps={{ 'data-testid': "modify-input" }}
                />
                <Button data-testid="submit-button" onClick={() => handleTodoEdit(todo)}>제출</Button>
                <Button data-testid="cancel-button" onClick={() => setSelectedTodo(0)}>취소</Button>
              </>
              : <>
                <ListItemText primary={todo.todo} />
                <Button data-testid="delete-button" onClick={() => handleTodoEdit(todo)}>수정</Button>
                <Button data-testid="modify-button" onClick={() => handleDelete(todo.id)}>삭제</Button>
              </>}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default TodoContainer;
