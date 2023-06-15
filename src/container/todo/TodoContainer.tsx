import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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
  const data = localStorage.getItem('data');
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  
  useEffect(() => {
    if(!data) {
      console.log(11)
      navigate('/signin', {replace: true})
    } 
    else {
      setTodos(getData(JSON.parse(data)));
    }
  }, [])

  
  const getData = (data: { access_token: string; }): TodoInterface[] => {
    axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      }).then((res) => { return res.data; } )
      .catch((err) => { console.log(err) })
    return [];
  }



  return (
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
            />
          </ListItemIcon>
          <ListItemText primary={todo.todo} />
        </ListItem>
      ))}
    </List>
  );
}

export default TodoContainer;
