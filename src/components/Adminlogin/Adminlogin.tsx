import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './adminlogin.css'; 
import AdminHeader from '../Adminheader/Adminheader';
import Cookies from 'js-cookie'; // Import js-cookie
import config from '../../api-requests/config';
import Image from '../../assets/image.png';

const Adminlogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
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
          Cookies.set('admintoken', token, { expires: 1 }); // Cookie expires in 1 day

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
    <div>
      <AdminHeader showLoginButton={false} />
      <div className="login-container">
        <div className="image-container">
          <img src={Image} alt="Login" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Admin Email@gmail.com"
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {loginError && <p className="error">{loginError}</p>}
          <div className="form-group">
            <button type="submit" className="login-button">Login</button>
          </div>
          <div className="form-group">
            <a href="/reset-password/forgot" className="forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Adminlogin;

