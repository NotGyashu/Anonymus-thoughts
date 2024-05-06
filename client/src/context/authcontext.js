import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialUser = JSON.parse(localStorage.getItem("user")) || null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUserData = () => {
    console.log("Fetching user data from localStorage...");
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log("User data retrieved successfully:", userData);
      setUser(userData);
    } else {
      console.log("No user data found in localStorage");
    }
  };

  useEffect(() => {
    getUserData(); // Call on component mount to check for stored data
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        console.log("User data in localStorage changed");
        getUserData(); // Update user state with new data from localStorage
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = async (userCredentials) => {
    try {
      const response = await axios.post("/api/login", userCredentials);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const contextValue = {
    user,
    setUser,
    error,
    setError,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
