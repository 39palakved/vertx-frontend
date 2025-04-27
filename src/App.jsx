import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Signup";
import Login from "./components/Login";

import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Feed from "./components/Feed";
import Savedpost from "./components/Savedpost";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      // Decode the JWT token (assuming it's in the format: { id, role })
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT token
      if (decodedToken.role === "admin") {
        setIsAdmin(true); // User is an admin
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Register & Login without Header */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes with Header */}
        <Route
          path="/saved"
          element={
            isLoggedIn && !isAdmin ? (
              <ProtectedRoute>
                <Header />
                <Savedpost />
              </ProtectedRoute>
            ) : (
              <Login /> // Redirect to login if not logged in or if admin
            )
          }
        />
        <Route
          path="/user-dashboard"
          element={
            isLoggedIn && !isAdmin ? (
              <ProtectedRoute>
                <Header />
                <UserDashboard />
              </ProtectedRoute>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            isLoggedIn && isAdmin ? (
              <ProtectedRoute>
                <Header />
                <AdminDashboard />
              </ProtectedRoute>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/feed"
          element={
            isLoggedIn && !isAdmin ? (
              <ProtectedRoute>
                <Header />
                <Feed />
              </ProtectedRoute>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
