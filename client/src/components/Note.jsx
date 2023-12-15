import React from "react";
import { IconButton, Paper, Typography, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id); // Pass the correct identifier to onDelete
  }

  return (
    <Paper className="note" elevation={3}>
      <Checkbox
        checked={props.isSelected}
        onChange={() => props.onSelect(props.id)}
        style={{ float: "left", size: "small", color: "#f5ba13"}}
      />
      <Typography variant="h6" sx={{marginTop:"5px"}}><b>{props.title}</b></Typography>
      <br/>
      <Typography variant="body1">{props.content}</Typography>
      <IconButton color="error" onClick={handleClick}>
        <DeleteIcon style={{ fontSize: "1.2em" }} />
      </IconButton>
    </Paper>
  );
}

export default Note;
