import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const auth = localStorage.getItem('data');

  return (
    <>
      <AppBar position='static' component="nav">
        <Toolbar variant="dense">
          <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Todos
          </Typography>
          {auth
            ? <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }} onClick={() => navigate('/todo')}>
                todo list
              </Button>
              <Button sx={{ color: '#fff' }} onClick={() => {localStorage.removeItem('data'); navigate('/')}}>로그아웃</Button>
            </Box>
            : <Button sx={{ color: '#fff' }} onClick={() => navigate('/signin')}>로그인</Button>
          }

        </Toolbar>
      </AppBar>
      
      <Container component="main" ref={ref} sx={{ mt: 1 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </>
  );
}

export default HomeLayout;
