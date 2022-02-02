import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please input username and password");
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/user/register", {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.data.code === 11000) {
        alert("Username already exist");
      }
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
