import { ListItemIcon, Checkbox } from "@mui/material";
import React from 'react';

interface TodoCheckBoxProps {
    isCompleted: boolean,
    handleUpdate: () => void,
}

const TodoCheckBox = ({ isCompleted, handleUpdate }: TodoCheckBoxProps) => {
    return (
        <ListItemIcon>
            <Checkbox
                edge="start"
                checked={isCompleted}
                tabIndex={-1}
                disableRipple
                onClick={handleUpdate}
            />
        </ListItemIcon>

    )
};

export default TodoCheckBox;
