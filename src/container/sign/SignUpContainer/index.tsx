import React from 'react';
import { Box, Avatar, Typography, Grid, TextField, Button, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = () => {
    const navigate = useNavigate();
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
            <Box component="form" noValidate onSubmit={() => console.log("signup")} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            inputProps={{"data-testid":"email-input"}}
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
                            autoComplete="new-password"
                            inputProps={{"data-testid":"password-input"}}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    data-testid="signup-button"
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
