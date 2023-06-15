import React from 'react';
import { Box, Button } from "@mui/material";
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const HomeContainer = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ p: 2, backgroundColor: grey[100], borderRadius: 60, }}>
                <InventoryTwoToneIcon sx={{ fontSize: 400 }} color="primary" />
            </Box>
            <Button sx={{ fontSize: 30, mt: 4 }} onClick={() => navigate('/todo')}>
                Todo 작성하러 가기
            </Button>
        </>
    );
}

export default HomeContainer;