import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import config from '../../api-requests/config';

const Adminsignup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [signupError, setSignupError] = useState<string>('');
  const navigate = useNavigate();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const validate = (): boolean => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }

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
    setSignupError(''); 
    setErrors({}); 
    if (validate()) {
      try {
        const response = await axios.post(`${config}/api/v1/admin/`, {
          admin_name: name,
          email,
          password,
        });

        if (response.status === 200) {
          navigate('/login', { replace: true });
        }

        if (response.status === 201) {
          alert('Successfully signed up!');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { message } = error.response.data;
          setSignupError(message || 'Signup failed. Please try again.');
        } else {
          setSignupError('An error occurred. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="image-container">
      </div>
      
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Username@gmail.com"
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
        <div className="form-group">

        </div>
        {signupError && <p className="error">{signupError}</p>}
        <div className="form-group">
          <button type="submit" className="signup-button">Sign Up</button>
        </div>
        <div className="form-group">
          <a href="/login" className="login-link">Already have an account? <b>Login</b></a>           
        </div>
      </form>
    </div>
  );
};

export default Adminsignup;
