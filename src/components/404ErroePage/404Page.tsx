
// import { Link } from 'react-router-dom'
// import pageNotFound from '../../assets/error.jpeg'
// import '../404ErroePage/404ErroePage.css'

// const PageNotFound = () => {
//   return (
//     <div>
//        <div className="not-found-container">
//       <h1>404 - Page Not Found</h1>
//       <img src={pageNotFound} alt="404" className="not-found-image" />
//       <p>Sorry, the page you are looking for does not exist.</p>
//       <Link to="/" className="home-link">Go to Home</Link>
//     </div>
//     </div>
//   )
// }

// export default PageNotFound


import React from "react";
import "./404ErroePage.css"; // Assuming you have styles.css in the same folder
import bgImage from "../../assets/bg.jpg"; // Update the path if necessary
import { useNavigate } from "react-router-dom"; // Use this if you are using react-router for navigation

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to homepage or specify the route you want
  };

  return (
    <div>
      <nav>
       
      </nav>
      <div className="container">
        <div className="header">
          <h1>404</h1>
          <h3>Page Not Found!</h3>
        </div>
        <img src={bgImage} alt="not found" />
        <div className="footer">
          <p>
            We're sorry, the page you requested could not be found. Please go
            back to the homepage!
          </p>
          <button onClick={handleGoHome}>GO HOME</button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
