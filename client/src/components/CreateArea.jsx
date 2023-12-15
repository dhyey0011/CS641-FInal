import React, { useState } from "react";
import Popup from "./Popup";
import { Button, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css"
function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  function submitNote(event) {
    event.preventDefault();
    if (note.title.trim() !== "" && note.content.trim() !== "") {
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
    } else {
      setPopupMessage("Title and content must not be empty!");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  }

  function handleSelectAll() {
    // Pass this function to the parent (App) component
    setSelectAll(!selectAll);
    props.onSelectAll();
  }

  return (
    <div className="create-area">
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
      <Popup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        message={popupMessage}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={selectAll}
            onChange={handleSelectAll}
            style={{
              marginRight: "8px",
              color: "#f5ba13",
            }}
            disabled={props.n}
          />
          <span>Select All</span>
        </div>
        <Button
          variant="contained"
          color="error"
          onClick={props.onDeleteSelected}
          startIcon={<DeleteIcon />}
          style={{
            fontFamily: "McLaren, cursive",
          }}
          disabled={props.selectedNotes.length < 2}
        >
          Delete Selected
        </Button>
      </div>
    </div>
  );
}

export default CreateArea;
