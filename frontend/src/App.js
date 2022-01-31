import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import MyList from "./pages/MyList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useGlobalContext } from "./context";
import axios from "axios";

function App() {
  const { setUser } = useGlobalContext();

  useEffect(() => {
    const refreshToken = async () => {
      if (!localStorage.getItem("token")) return;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/check",
          {},
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        setUser(true);
        localStorage.setItem("token", response.data.token);
      } catch (error) {
        console.log(error);
        setUser(false);
      }
    };
    refreshToken();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="my-list" element={<MyList />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
