import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const { user, setUser } = useGlobalContext();
  const logout = () => {
    setUser(false);
    localStorage.removeItem("token");
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="move-app-logo"
            />
          </Link>
        </div>
        <ul className="navbar-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upcoming">Upcoming movies</Link>
          </li>
          <li>
            <Link to="/my-list">My list</Link>
          </li>
        </ul>
        <ul className="navbar-right">
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
