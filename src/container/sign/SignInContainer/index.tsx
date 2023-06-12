import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, TextField, Button, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInCotainer = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.id]: event.target.value})
    };

    const handleLogin = () => {
        axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', user, {
            headers: {
            'Content-Type': 'application/json'
            }}).then((res) => {
                localStorage.setItem('data', JSON.stringify(res.data))
                navigate('/todo', {replace: true})
            }).catch((res) => { console.log('Error!') });
    }
    
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                로그인
            </Typography>
            <Box sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    onChange={handleChange}
                    inputProps={{"data-testid":"email-input"}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    inputProps={{"data-testid":"password-input"}}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    data-testid="signup-button"
                    onClick={handleLogin}
                >
                    로그인 하기
                </Button>
                <Box sx={{ textAlign: 'end' }}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            navigate('/signup');
                        }}
                    >
                        회원가입 페이지로 가기
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default SignInCotainer;
