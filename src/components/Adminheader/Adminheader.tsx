import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import './Adminheader.css';
import Eblue from '../../assets/Eblue.png';

interface AdminHeaderProps {
  showLoginButton?: boolean; // make the prop optional
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ showLoginButton = true }) => {
  const handleLoginClick = () => {
    window.location.href = '/'; // Change this to your login page route
  };

  return (
    <AppBar position="static" className="appBar">
      <Toolbar className="toolbar">
      <div className="logoContainer">
       <img src={Eblue} alt="Logo" className="logoImage" />
        <Typography variant="h6" className="headerTitle">
            ShipEase
            </Typography>
              </div>

        <div className="actionContainer">
          <Avatar alt="Admin Profile" className="profileImage" />
          {showLoginButton && (
            <Button className="loginButton" onClick={handleLoginClick}>
              <div className="loginText">
                <span className="loginTitle">Login?</span>
              </div>
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;

