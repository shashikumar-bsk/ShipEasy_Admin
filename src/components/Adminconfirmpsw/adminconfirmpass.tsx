import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, Paper, Snackbar, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import '../../assets/fonts/poppins.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import img from '../../assets/Log.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Adminconfirmpassword } from '../../api-requests/adminRouter';

const Adminconfirmpass = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPass, setShowPass] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [backendError, setBackendError] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [location.search]);

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setBackendError('');

        if (newPassword !== confirmPassword) {
            setError('New password does not match the confirm password.');
            return;
        }

        try {
            const response = await Adminconfirmpassword({ email, newPassword });
            console.log(response);

            if (response.message === 'Password reset successfully') {
                setNewPassword('');
                setConfirmPassword('');
                setError('');
                setOpenSnackbar(true);
                console.log('Password updated successfully');

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setBackendError('Failed to update the password. Please try again later.');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setBackendError(error.response.data.message || 'Failed to submit the form. Please try again later.');
            } else {
                setBackendError('Failed to submit the form. Please try again later.');
            }
            console.error('Failed to submit the form:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Grid container sx={{ height: '100vh', width: '100vw', position: 'relative' }}>
            <Box
                sx={{
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    width: '100%',
                    height: '100vh',
                    zIndex: -1,
                }}
            />

            <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{
                    display: { xs: 'flex', sm: 'flex', md: 'none' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: { xs: '100vh', sm: '100vh' },
                    position: 'relative',
                }}
            >
                <Paper
                    elevation={15}
                    sx={{
                        padding: 4,
                        width: { xs: '70%', sm: '60%' },
                        height: 'auto',
                        backgroundColor: { xs: 'rgba(53, 64, 74, 0.8)', sm: 'rgba(53, 64, 74, 0.8)', md: "#16202A" },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        rowGap: '10px',
                    }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{ marginBottom: 2, fontSize: { xs: '1.5rem', sm: '2rem' }, fontFamily: 'Poppins', color: 'white', overflow: 'hidden' }}
                    >
                        Create new password
                    </Typography>

                    <TextField
                        required
                        id="email"
                        label="Email"
                        autoComplete='email'
                        variant="outlined"
                        sx={{
                            backgroundColor: 'white',
                            width: {
                                xs: '100%',
                                sm: '70%',
                                md: '100%',
                            },
                            height: {
                                xs: 54,
                                sm: 55,
                                md: 54,
                            },
                            borderRadius: 2,
                            marginBottom: 2,
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    {errorMessage && (
                        <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <TextField
                        required
                        id="new-password"
                        label="Password"
                        autoComplete='new-password'
                        onChange={handleNewPasswordChange}
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        sx={{
                            marginBottom: 2,
                            height: { xs: '54px', sm: '54px' },
                            width: { xs: '100%', sm: '70%' },
                            backgroundColor: 'white',
                            borderRadius: '12px',
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{
                            sx: {
                                fontFamily: 'poppins',
                            }
                        }}
                    />
                    {errorMessage && (
                        <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <TextField
                        required
                        id="confirm-password"
                        label="Confirm password"
                        autoComplete='new-password'
                        onChange={handleConfirmPasswordChange}
                        type={showPass ? 'text' : 'password'}
                        variant="outlined"
                        sx={{
                            marginBottom: 2,
                            height: { xs: '54px', sm: '54px' },
                            width: { xs: '100%', sm: '70%' },
                            backgroundColor: 'white',
                            borderRadius: '12px',
                        }}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPass(!showPass)}
                                        edge="end"
                                    >
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{
                            sx: {
                                fontFamily: 'poppins',
                            }
                        }}
                    />
                    {errorMessage && (
                        <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                        fullWidth
                        sx={{ height: '54px', width: { xs: '100%', sm: '70%' }, borderRadius: '12px', marginBottom: 1, fontFamily: 'poppins' }}
                    >
                        Submit
                    </Button>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                            Password reset successful!
                        </Alert>
                    </Snackbar>

                </Paper>
            </Grid>

            <Grid
                item
                md={6}
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50vw',
                    height: '100vh',
                    backgroundColor: '#16202A',
                }}
            >
                <Box
                    component="img"
                    src={img}
                    sx={{
                        width: '100%',
                        height: '100vh',
                        objectFit: 'cover',
                    }}
                />
            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                md={6}
                sx={{
                    height: '100vh',
                    width: { xs: '100vw', sm: '50vw', md: '50vw' },
                    display: { xs: 'none', sm: 'none', md: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#16202A',
                }}
            >
                <Paper
                    elevation={15}
                    sx={{
                        padding: 4,
                        width: { xs: '80%', sm: '70%', md: '55%' },
                        height: { xs: 'auto', sm: 'auto', md: '65%' },
                        backgroundColor: '#35404A',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        rowGap: '10px',
                    }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{ marginBottom: 2, fontSize: '1.5rem', fontFamily: 'Poppins', color: 'white', overflow: 'hidden' }}
                    >
                        Create new password
                    </Typography>
                    <TextField
                        required
                        id="email"
                        autoComplete='email'
                        label="Email"
                        variant="outlined"
                        sx={{
                            backgroundColor: 'white',
                            width: {
                                xs: '100%',
                                sm: '80%',
                                md: '90%',
                            },
                            height: {
                                xs: 54,
                                sm: 55,
                                md: 54,
                            },
                            borderRadius: '12px',
                            marginBottom: 1,
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        required
                        id="new-password"
                        label="Password"
                        onChange={handleNewPasswordChange}
                        autoComplete='new-password'
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        sx={{
                            marginBottom: 1,
                            height: { xs: '54px', sm: '54px' },
                            width: { xs: '100%', sm: '90%' },
                            backgroundColor: 'white',
                            borderRadius: '12px',
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{
                            sx: {
                                fontFamily: 'poppins',
                            }
                        }}
                    />
                    <TextField
                        required
                        id="confirm-password"
                        label="Confirm password"
                        autoComplete='new-password'
                        onChange={handleConfirmPasswordChange}
                        type={showPass ? 'text' : 'password'}
                        variant="outlined"
                        sx={{
                            marginBottom: 2,
                            height: { xs: '54px', sm: '54px' },
                            width: { xs: '100%', sm: '90%' },
                            backgroundColor: 'white',
                            borderRadius: '12px',
                        }}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPass(!showPass)}
                                        edge="end"
                                    >
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{
                            sx: {
                                fontFamily: 'poppins',
                            }
                        }}
                    />


                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={loading}
                        onClick={handleSubmit}
                        sx={{ height: '50px', width: '90%', borderRadius: '12px', marginBottom: 1, fontFamily: 'poppins' }}
                    >
                    Submit
                    </Button>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                            Password reset successful!
                        </Alert>
                    </Snackbar>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Adminconfirmpass;