import React from "react";
import {auth, logout } from "../firebaseAuth/firebase"
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
function Header({ nameFlag }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  function logoutUser() {
    logout();
    navigate("/login");
  }
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h1>Keeper</h1>
      <Button variant="contained" disabled={nameFlag === "" || !user} onClick={logoutUser}>
        Logout
      </Button>
    </header>
  );
}

export default Header;
