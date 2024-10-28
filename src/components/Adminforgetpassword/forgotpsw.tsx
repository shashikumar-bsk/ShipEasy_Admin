import React, { useState } from "react";
import "./forgotpsw.css";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../Adminheader/Adminheader";
import { AdminForgetPassword } from "../../api-requests/adminRouter";
// Adjust the path if needed

const AdminForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
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
      console.log(response);

      if (response) {
        navigate(`/admin/verificationpage?email=${encodeURIComponent(email)}`);
      } else {
        setErrorMessage("Failed to check email. Please try again later.");
      }
    } catch (error) {
      console.error("Failed to check email. Please try again later.", error);
      setErrorMessage("Failed to check email. Please try again later.");
    }
  };

  return (
    <div>
      <AdminHeader showLoginButton={false} /> {/* Hide login button here */}
      <div className="admin-forgot-password-container">
        <form onSubmit={handleSubmit} className="admin-forgot-password-form">
          <h2 className="admin-forgot-password-heading">Forgot Password?</h2>
          <p className="admin-forgot-password-description">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <div className="admin-form-group">
            <label htmlFor="email" className="admin-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Username@gmail.com"
              className="admin-input"
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="admin-form-group">
            <button type="submit" className="admin-login-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
