import React from "react";
import { Modal, Paper } from "@mui/material";

function Popup({ open, onClose, message }) {
  const popupStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const paperStyle = {
    padding: "10px",
    width: "300px", // Increase the width to your desired value
    height: "100px", // Increase the height to your desired value
    background: "#f5ba13",
    borderRadius: "7px",
    boxShadow: "0 2px 5px #ccc",
    margin: "16px",
    float: "left",
  };

  const textContainerStyle = {
    color: "#fff",
    fontFamily: "McLaren, cursive", // Set the font family to "McLaren" cursive
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="popup-title" aria-describedby="popup-description">
      <div style={popupStyle}>
        <Paper elevation={0} style={paperStyle}>
          <div style={textContainerStyle}>
            <h2 id="popup-title">Alert</h2>
            <p id="popup-description">{message}</p>
          </div>
        </Paper>
      </div>
    </Modal>
  );
}

export default Popup;
