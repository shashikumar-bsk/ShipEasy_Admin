import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './verifypsw.css';
import AdminHeader from '../Adminheader/Adminheader';
import { ResendOtp, VerifyPage } from '../../api-requests/adminRouter';

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email') || '';
  console.log(email);

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendEnabled(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if not the last one
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '' && index > 0) {
      // Move to the previous input field on backspace
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await VerifyPage({ email, otp: otp.join('') });
      console.log(response);

      if (response) {
        console.log('OTP verified successfully');
        navigate(`/admin-create-passwords?email=${encodeURIComponent(email)}`);
      } else {
        console.error('Failed to verify OTP. Response:', response);
        setErrorMessage('Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error in verifying OTP:', error);
      setErrorMessage('Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await ResendOtp(email);
      console.log(response);

      if (response) {
        console.log('OTP resent successfully');
        setTimer(60); // Reset the timer
        setIsResendEnabled(false);
      } else {
        console.error('Failed to resend OTP. Response:', response);
        setErrorMessage('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error in resending OTP:', error);
      setErrorMessage('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div>
      <AdminHeader showLoginButton={false} />
      <form className="otp-Form" onSubmit={handleSubmit}>
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">We have sent a verification code to your mobile number</p>
        <div className="inputContainer">
          {otp.map((value, index) => (
            <input
              key={index}
              required
              maxLength={1}
              type="text"
              className="otp-input"
              value={value}
              onChange={handleChange(index)}
              ref={(el) => (inputRefs.current[index] = el)} // Assign the ref to the input element
            />
          ))}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="verifyButton">Verify</button>
        <button
          type="button"
          className="resendBtn"
          onClick={handleResendOtp}
          disabled={!isResendEnabled}
        >
          Resend OTP {isResendEnabled ? '' : `(${timer}s)`}
        </button>
      </form>
    </div>
  );
};

export default VerificationPage;
