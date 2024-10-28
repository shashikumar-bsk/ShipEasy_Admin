import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Snackbar, Alert } from '@mui/material';
import './Adminconfirmpsw.css';
import AdminHeader from '../Adminheader/Adminheader';
import { Adminconfirmpassword as AdminconfirmpasswordAPI } from '../../api-requests/adminRouter'; // Adjust the path if needed

const Adminconfirmpassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [backendError, setBackendError] = useState<string>('');
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
      const response = await AdminconfirmpasswordAPI({ email, newPassword });
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
    <div>
      <AdminHeader showLoginButton={false} />
      <div className="admin-new-password-container">
        <form onSubmit={handleSubmit} className="admin-new-password-form">
          <h2 className="admin-new-password-heading">Create a New Password</h2>

          <div className="admin-form-group">
            <TextField
              label="Email"
              type="email"
              value={email}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              required
            />
          </div>

          <div className="admin-form-group">
            <TextField
              label="Password"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Password"
              variant="outlined"
              fullWidth
              required
            />
          </div>

          <div className="admin-form-group">
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              variant="outlined"
              fullWidth
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {backendError && <p className="error-message">{backendError}</p>}

          <div className="admin-form-group">
            <button type="submit" className="login-button">Submit</button>
          </div>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Password reset successful!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Adminconfirmpassword;