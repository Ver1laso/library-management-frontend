import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { Avatar, Box, Container, Paper, TextField, Typography, Snackbar, Alert, Button, Link, Grid } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import libraryServices from '../services/libraryServices';
import { useNavigate } from 'react-router-dom';


function LoginPage () {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email.includes('@')){
            setSnackbarMessage("Please enter a valid email address");
            setOpenSnackBar(true);
            return;
        }
        
        try {
            const response = await libraryServices.login('http://localhost:8080/api/auth/login', {
                email,
                password
            });

            const { token } = response.data;
            localStorage.setItem('jwtToken', token);
            libraryServices.setToken(token)

            console.log("Loing successful")

            setTimeout(() => {
                navigate('/MyBooks');
            }, 1000);


        } catch (e) {
            setSnackbarMessage("Invalid credentials");
            setOpenSnackBar(true);
            // setError("Invalid credentials");
            console.error("Loging error: ", e)
        }

        
        console.log("Logging in", {email, password})
    }

    const handleCloseSnackbar = () => {
        setOpenSnackBar(false)
    }

    return (
        <>
            <Container maxWidth="xs">
                <Paper 
                    elevation={10}
                    sx={{
                        marginTop: 8,
                        padding: 2
                    }}>
                        <Avatar sx={{
                            mx: "auto",
                            bgcolor: "primary.main",
                            textAlign: "center",
                            mb: 1
                        }}>
                            <LockOutlineIcon />
                        </Avatar>
                        <Typography sx={{ textAlign: "center" }}>
                            Sign In
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField 
                                placeholder='Enter email'
                                fullWidth
                                required
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 2}} />

                                <TextField 
                                placeholder='Enter password'
                                fullWidth
                                required
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 2}} />
                            <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>
                                Sign in
                            </Button>
                        </Box>
                        <Grid container justifyContent='space-between' sx={{ mt: 1}}>
                            <Grid item>
                                <Link component={RouterLink} to="/forgotPage">
                                Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/registerPage">
                                Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Paper>
            </Container>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity='warning'
                    sx={{ width: '100%'}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )


}

export default LoginPage;