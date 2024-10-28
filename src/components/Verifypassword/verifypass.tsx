import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import '../../assets/fonts/poppins.css';
import img from '../../assets/Log.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { VerifyPage, AdminForgetPassword } from '../../api-requests/adminRouter';

const Verifypass = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email') || '';
    const orderId = new URLSearchParams(location.search).get('orderId') || '';
    console.log(email);
    // const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [timer, setTimer] = useState<number>(30);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
    const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));

    const handleChange = (element, index: number) => {
        const value = element.value.replace(/\D/g, '');
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < otp.length - 1) {
            const nextField = document.querySelector(
                `input[name=otp-field-${index + 1}]`
            );
            if (nextField) {
                (nextField as HTMLInputElement).focus();
            }
        }

        if (value !== '' && element.nextSibling) {
            console.log(`Focusing on the next input field: otp-field-${index + 1}`);  // Debug log for focus change
            element.nextSibling.focus();
        } else if (!element.nextSibling) {
            console.log(`No next input field for otp-field-${index}`);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (otp.some((digit) => digit === '')) {
            setErrorMessage('Please enter all fields !');
            return;
        }
    
        try {
          const response = await VerifyPage({ email, otp: otp.join(''), orderId});
          console.log(response.status);
              
          if (response.message=="OTP Verified Successfully!") {
            console.log('OTP verified successfully');
            navigate(`/admin-create-passwords?email=${encodeURIComponent(email)}`);
          } else {
            console.error('Failed to verify OTP. Response:', response);
            setErrorMessage('Failed to verify OTP. Please try again.');
          }
        } catch (error) {
          console.error('Error in verifying OTP:', error);
          
          if (error.response && error.response.error === 'OTP has expired') {
            setErrorMessage('OTP has expired. Please request a new one.');
        } else {
            setErrorMessage('Failed to verify OTP. Please try again.');
        }
        }
      };


      useEffect(() => {
        let countdown: NodeJS.Timeout;

        if (timer > 0) {
            setIsResendEnabled(true);
            countdown = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else {
            setIsResendEnabled(false);
        }

        return () => clearInterval(countdown);
    }, [timer]);


    const handleResendOtp = async () => {
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
                        Verify OTP !
                    </Typography>

                    
                    <Box display="flex" justifyContent="center" gap={1} marginBottom={1}>
                        {otp.map((digit, index) => (
                            <TextField
                                key={index}
                                name={`otp-field-${index}`}
                                value={digit}
                                onChange={(e) => handleChange(e.target, index)}
                                inputProps={{
                                    maxLength: 1,
                                    style: { textAlign: 'center', fontSize: '20px', color: 'black' }, 
                                }}
                                type="text"
                                variant="outlined"
                                size="small"
                                sx={{
                                    width: { xs: '45px', sm: '45px', md: '45px' },
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                }}
                            />
                        ))}
                    </Box>

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
                        Verify
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={handleResendOtp}
                        fullWidth
                        sx={{ height: '54px', width: { xs: '100%', sm: '70%' }, borderRadius: '12px', marginBottom: 2, fontFamily: 'poppins' }}
                    >
                        Resend {timer > 0 ? `(${timer}s)` : ''}
                    </Button>
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
                        Verify OTP !
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={1} marginBottom={1}>
                        {otp.map((digit, index) => (
                            <TextField
                                key={index}
                                value={digit}
                                name={`otp-field-${index}`}
                                onChange={(e) => handleChange(e.target, index)}
                                inputProps={{
                                    maxLength: 1,
                                    style: { textAlign: 'center', fontSize: '20px', color: 'black' },
                                }}
                                type="text"
                                variant="outlined"
                                size="small"
                                sx={{
                                    width: { xs: '35px', sm: '45px', md: '45px' },
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                }}
                            />
                        ))}
                    </Box>
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
                        sx={{ height: '50px', width: '80%', borderRadius: '12px', marginBottom: 1, fontFamily: 'poppins' }}
                    >
                        Verify
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={handleResendOtp}
                        fullWidth
                        sx={{ height: '50px', width: '80%', borderRadius: '12px', marginBottom: 2, fontFamily: 'poppins' }}
                    >
                        Resend {timer > 0 ? `(${timer}s)` : ''}
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Verifypass;