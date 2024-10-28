import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from cookies
    Cookies.remove('admintoken');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <Button 
      variant="contained" 
      color="inherit" 
      startIcon={<LogoutIcon />} 
      onClick={handleLogout}
      sx={{ 
        backgroundColor: '#686D76',
        color: 'white',
        '&:hover': {
          backgroundColor: '#4a4a4a', // Darker shade for hover effect
        },
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
