import LockOutlineIcon from '@mui/icons-material/LockOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Avatar, Box, Container, Paper, TextField, Typography, InputAdornment, Snackbar, Alert, Button } from '@mui/material';
import { useState } from 'react';


function RegisterPage () {



    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [openSnackBar, setOpenSnackBar] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState('');
    
        const passwordsMatch = password === confirmPassword && confirmPassword !== '';
        const passwordDontMatch = password !== confirmPassword && confirmPassword !== '';
    
        const handleSubmit = (e) => {
            e.preventDefault();
            if(!passwordsMatch){
                console.log("Password don't match");
                return;
            }
            if(!email.includes('@')){
                setSnackbarMessage("Please enter a valid email address");
                setOpenSnackBar(true);
                return;
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
    
                                <TextField 
                                    placeholder=' Reenter password'
                                    fullWidth
                                    required
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={passwordDontMatch}
                                    helperText={passwordDontMatch ? "Passwords don't match" : ""}
                                    slotProps={{
                                        input: {
                                            endAdornment: confirmPassword !== '' && (
                                                <InputAdornment position="end">
                                                    {passwordsMatch ? (
                                                        <CheckCircleIcon sx={{ color: 'success.main' }} />
                                                    ) : (
                                                        <CancelIcon sx={{ color: 'error.main' }} />
                                                    )}
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    sx={{ mb: 2}} />
                                <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>
                                    Sign up
                                </Button>
    
                            </Box>
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

export default RegisterPage;