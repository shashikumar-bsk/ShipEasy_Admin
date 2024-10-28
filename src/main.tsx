import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { requestForToken, onMessageListener } from "./components/firebase";

const MainApp: React.FC = () => {
  useEffect(() => {
    // Request permission for notifications and get the token
    requestForToken();
  }, []);

  useEffect(() => {
    // Listen for incoming messages
    onMessageListener()
      .then((payload) => {
        console.log('Message received: ', payload);
        // Handle the notification payload here (e.g., show a notification or alert)
      })
      .catch((err) => console.log('Failed to receive message: ', err));
  }, []);

  return <App />;
};

// Render the main application component
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
