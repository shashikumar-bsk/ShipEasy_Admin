import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import '../../assets/fonts/poppins.css';
import img from '../../assets/Log.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminForgetPassword } from '../../api-requests/adminRouter';

const Forgotpass = () => {

    const [email, setEmail] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorMessage, setErrorMessage] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errors, setErrors] = useState<{ email?: string; }>({});
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage("Invalid email format");
            return;
        }
        try {
            const response = await AdminForgetPassword({ email });
            if (response.message=="OTP sent successfully") {
                const  orderId  = response.orderId
                console.log("Sending orderId",  orderId);                
                navigate(`/admin/verificationpages?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderId)}`);
            } else {
                setErrorMessage("Failed to check email. Please try again later.");
            }
        } catch (error) {
            setErrorMessage("Failed to check email. Please try again later.");
        } 
    }
        

    return (
        <Grid
            container
            sx={{ height: '100vh', width: '100vw', display: 'flex' }}
        >
            <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#16202A',
                    width: '50vw',
                    height: '100vh',
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
                sm={12}
                md={6}
                sx={{
                    position: 'relative',
                    backgroundImage: { xs: `url(${img})`, sm: `url(${img})`, md: 'none' },
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor:'#16202A',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                }}
            >
                <Paper
                    elevation={15}
                    sx={{
                        padding: 4,
                        width: { xs: '70%', sm: '50%', md: '55%' },
                        height: { xs: 'auto', sm: 'auto', md: '65%' },
                        backgroundColor: { xs: 'rgba(53, 64, 74, 0.8)', sm: 'rgba(53, 64, 74, 0.8)', md: '#35404A' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        rowGap: '10px',
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: 2, color: 'white', fontFamily: 'poppins' }}>
                        Forgot password?
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'white', fontFamily: 'poppins', marginBottom: 2 }}>
                        Enter your email and we'll send you a code
                    </Typography>

                    <TextField
                        required
                        id="filled-required"
                        label="Email"
                        variant="outlined"
                        sx={{
                            backgroundColor: 'white',
                            width: {
                                xs: '100%',
                                sm: '80%',
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
                        onChange={handleEmailChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{
                            height: { xs: '54px', sm: '54px', md: '50px' },
                            width: { xs: '100%', sm: '80%', md: '100%' },
                            borderRadius: { xs: '12px', sm: '8px', md: '12px' },
                            marginBottom: 2,
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Forgotpass;