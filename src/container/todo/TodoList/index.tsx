import { List, ListItem, ListItemIcon, Checkbox, TextField, Button, ListItemText } from "@mui/material";
import axios from "axios";
import React, { useState } from 'react';
import { TodoComponentProps, TodoInterface } from "../../../types";
import TodoCheckBox from "../../../components/TodoList/TodoCheckBox";

const TodoList = ({ todos, access_token, handleChange }: TodoComponentProps) => {
    const [selectedTodo, setSelectedTodo] = useState(0);
    const [newTodoInput, setNewTodoInput] = useState('');

    const handleUpdate = (newData: TodoInterface) => {
        axios.put(`https://www.pre-onboarding-selection-task.shop/todos/${newData.id}`,
          { todo: newData.todo, isCompleted: newData.isCompleted },
          {
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
            }
          }).then((res) => { handleChange(todos.map((todo) => todo.id === newData.id ? res.data : todo)) })
          .catch((err) => console.log(err));
      }
    
      const handleDelete = (id: number) => {
        axios.delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            }
          }).then((res) => { handleChange(todos.filter((todo) => todo.id !== id)) })
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
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todos.map((todo) => (
                <ListItem
                    key={todo.id}
                    disablePadding
                >
                    <TodoCheckBox
                        isCompleted={todo.isCompleted}
                        handleUpdate={() => handleUpdate({ ...todo, isCompleted: !todo.isCompleted })}
                    />

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
                            <Button data-testid="modify-button" onClick={() => handleTodoEdit(todo)}>수정</Button>
                            <Button data-testid="delete-button" onClick={() => handleDelete(todo.id)}>삭제</Button>
                        </>}
                </ListItem>
            ))}
        </List>
    )
};

export default TodoList;
