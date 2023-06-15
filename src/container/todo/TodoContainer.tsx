import { Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoInputField from './TodoInputField';
import { TodoInterface } from '../../types';
import TodoList from './TodoList';

const TodoContainer = () => {
  const navigate = useNavigate();
  const dataString = localStorage.getItem('data');
  const data = dataString ? JSON.parse(dataString) : null;
  const [todos, setTodos] = useState<TodoInterface[]>([]);

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

  const handleChange = (newDate: TodoInterface[]) => {
    setTodos(newDate);
  };

  return (
    <>
      <TodoInputField
        todos={todos}
        access_token={data?.access_token}
        handleChange={handleChange}
      />

      <TodoList
        todos={todos}
        access_token={data?.access_token}
        handleChange={handleChange}
      />
    </>
  );
}

export default TodoContainer;
