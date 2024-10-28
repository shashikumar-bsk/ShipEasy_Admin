import { Box, Button, Paper, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../assets/fonts/poppins.css';
import img from '../../assets/Log.png';
import config from '../../api-requests/config';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loginError, setLoginError] = useState<string>('');
    const navigate = useNavigate();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const validate = (): boolean => {
        const newErrors: { email?: string; password?: string } = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoginError('');
        setErrors({});
        if (validate()) {
            try {
                const response = await axios.post(`${config}/api/v1/admin/login`, {
                    email,
                    password,
                });

                if (response.status === 200) {
                    const token = response.data.token;
                    Cookies.set('admintoken', token, { expires: 1 });

                    console.log('Token stored:', Cookies.get('admintoken'));

                    await navigate('admin/home', { replace: true });
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const { message } = error.response.data;
                    if (message === 'Invalid email') {
                        setErrors({ email: 'Invalid email' });
                    } else if (message === 'Invalid password') {
                        setErrors({ password: 'Invalid password' });
                    } else {
                        setLoginError('Invalid credentials....');
                    }
                } else {
                    setLoginError('An error occurred. Please try again later.');
                }
            }
        }
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
                        width: { xs: '70%', sm: '70%' },
                        height: 'auto',
                        backgroundColor: { xs: 'rgba(53, 64, 74, 0.8)', sm: 'rgba(53, 64, 74, 0.8)', md:"#16202A" },
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
                        Welcome Back !!!
                    </Typography>
                    <TextField
                        required
                        id="filled-required"
                        label="Email"
                        variant="outlined"
                        sx={{
                            marginBottom: 2,
                            height: { xs: '54px', sm: '54px' },
                            width: { xs: '90%', sm: '90%' },
                            backgroundColor: 'white',
                            borderRadius: '12px',
                        }}
                        onChange={handleEmailChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputLabelProps={{
                            sx: {
                                fontFamily: 'poppins',
                            }
                        }}
                    />
                    <TextField
                        required
                        id="filled-required"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        sx={{
                            marginBottom: 2,
                            height: { xs: '54px', sm: '54px' },
                            width: { xs: '90%', sm: '90%' },
                            backgroundColor: 'white',
                            borderRadius: '12px',
                        }}
                        onChange={handlePasswordChange}
                        error={!!errors.password}
                        helperText={errors.password}
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
                    {loginError && (
                        <Typography 
                        variant='body2'
                        color='error'
                        sx={{ marginBottom: 2, fontFamily: 'Poppins', width: '90%' }}
                        >
                            {loginError}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                        fullWidth
                        sx={{ height: '54px', width: { xs: '90%', sm: '90%' }, borderRadius: '12px', marginBottom: 2, fontFamily: 'poppins' }}
                    >
                        Login
                    </Button>
                    <Typography variant='body2' sx={{ fontFamily: 'poppins' }}>
                        <Link to="/reset-password/forgot" style={{ textDecoration: 'none', color: 'white' }}>
                            Forgot password?
                        </Link>
                    </Typography>
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
                        width: { md: '55%' },
                        height: { md: '65%' },
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
                        Welcome Back !!!
                    </Typography>
                    <TextField
                        required
                        id="filled-required"
                        label="Email"
                        variant="outlined"
                        sx={{
                            marginBottom: 2,
                            height: '55px',
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                        }}
                        onChange={handleEmailChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputLabelProps={{
                            sx: {
                                fontFamily: 'poppins',
                            }
                        }}
                    />
                    <TextField
                        required
                        id="filled-required"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        sx={{
                            marginBottom: 2,
                            height: '54px',
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                        }}
                        onChange={handlePasswordChange}
                        error={!!errors.password}
                        helperText={errors.password}
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
                    {loginError && (
                        <Typography 
                        variant='body2'
                        color='error'
                        sx={{ marginBottom: 2, fontFamily: 'Poppins', width: '90%' }}
                        >
                            {loginError}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                        fullWidth
                        sx={{ height: '50px', width: '100%', borderRadius: '12px', marginBottom: 2, fontFamily: 'poppins' }}
                    >
                        Login
                    </Button>
                    <Typography variant='body2' sx={{ fontFamily: 'poppins' }}>
                        <Link to="/reset-password/forgot" style={{ textDecoration: 'none', color: 'white' }}>
                            Forgot password?
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Login;