import { Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from 'react';
import { TodoComponentProps } from "../../../types";

const TodoInputField = ({ todos, access_token, handleChange }: TodoComponentProps) => {
    const [todoInput, setTodoInput] = useState('');

    const createTodo = async () => {
        try {
            const response = await axios.post('https://www.pre-onboarding-selection-task.shop/todos', { todo: todoInput }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            const newData = response.data;
            handleChange(todos.concat(newData));
            setTodoInput('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack direction="row">
            <TextField
                id="todo-input"
                placeholder='할 일을 입력하세요.'
                fullWidth
                variant="standard"
                inputProps={{ 'data-testid': "new-todo-input" }}
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
            />
            <Button data-testid="new-todo-add-button" onClick={createTodo}>추가</Button>
        </Stack>
    );
}

export default TodoInputField;
