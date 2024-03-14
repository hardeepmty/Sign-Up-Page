import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import your CSS file for styling

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registration, setRegistration] = useState(""); // New state for registration
  const [branch, setBranch] = useState(""); // New state for branch
  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        registration, // Include registration in the request
        branch, // Include branch in the request
      });
      setMessage(response.data);
      alert("User Created Successfully!!!");
    } catch (error) {
      console.error(error);
      setMessage("An error occurred");
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        { email: forgotEmail }
      );
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      setMessage("An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Registration" // Input for registration
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Branch" // Input for branch
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
      </div>

      <div className="card">
        <h1>Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Forgot Password
          </button>
        </form>
      </div>

      <p className="message">{message}</p>
    </div>
  );
}

export default App;
