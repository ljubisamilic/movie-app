import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useGlobalContext();
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
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setUsername("");
      setPassword("");
      setLoading(false);
      setUser(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="form-container">
      <h1>Login</h1>
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
        <button className="button">{loading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
