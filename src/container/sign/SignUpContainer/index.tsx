import React, { useState } from 'react';
import { Box, Avatar, Typography, Grid, TextField, Button, Link, FormHelperText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpContainer = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });
    const [emailValidation, setEmailValidation] = useState(false);
    const [pwdValidation, setPwdValidation] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.id]: event.target.value})
        if (event.target.id === 'email') {
            if (event.target.value.includes('@')) {
                setEmailValidation(true);
            } else {
                setEmailValidation(false);
            }
        }
        if (event.target.id === 'password') {
            if (event.target.value.length >= 8) {
                setPwdValidation(true);
            } else {
                setPwdValidation(false);
            }
        }
    };

    const handleSignUp = () => {
        axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup', user, {
            headers: {
            'Content-Type': 'application/json'
            }
          }).then((res) => navigate('/signin', { replace: true }))
            .catch((res) => { console.log('Error!') });
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
                회원가입
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            error={!(emailValidation || user.email.length === 0)}
                            inputProps={{"data-testid":"email-input"}}
                            helperText={!(emailValidation || user.email.length === 0) && "'@'를 포함해야 합니다."}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={handleChange}
                            error={!(pwdValidation || user.password.length === 0)}
                            inputProps={{"data-testid":"password-input"}}
                            helperText={!(pwdValidation || user.password.length === 0) && "8자 이상을 입력해야 합니다."}
                        />
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    data-testid="signup-button"
                    disabled={!(emailValidation && pwdValidation)}
                    onClick={handleSignUp}
                >
                    회원가입 하기
                </Button>
                <Box sx={{ textAlign: 'end' }}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            navigate('/signin');
                        }}
                    >
                        로그인 페이지로 가기
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUpContainer;
