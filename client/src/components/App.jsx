import React, { useState, useEffect, useMemo} from "react";
import { Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "../App.css";
import Login from "./login";
import Register from "./Register";
import { AuthProvider } from "../firebaseAuth/AuthProvider";
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseAuth/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import ResetPassword from "./ResetPassword"

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectAll, setSelectAll] = useState(false); 
  const [notAuthenticated, setNotAuthenticated] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchNotes = () => {
    // Include uid in the URL to fetch user-specific notes
    fetch(`http://localhost:5000/api/notes?uid=${user?.uid}`)
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // User is authenticated, fetch data'
         
          fetchNotes();
          fetchUserData();
          setNotAuthenticated(false);
          navigate("/notes");
        } else {
          // User is not authenticated, handle accordingly
          // You can set a flag to show a login form, display a message, etc.
          setNotAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while fetching data");
      }
    };

    if (loading) {
      // Loading state while checking authentication status
      return;
    }

    fetchData();
  }, [user, loading]);

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  const addNote = (newNote) => {
    // Include uid in the request payload
    fetch(`http://localhost:5000/api/notes?uid=${user?.uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newNote, uid: user?.uid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes((prevNotes) => [...prevNotes, data]);
      })
      .catch((error) => console.error("Error adding note:", error));
  };

  const deleteNote = (id) => {
    // Include uid in the URL to delete user-specific note
    fetch(`http://localhost:5000/api/notes/${notes[id]._id}?uid=${user?.uid}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== notes[id]._id));
        setSelectedNotes((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
      })
      .catch((error) => console.error("Error deleting note:", error));
  };
  
  
  function selectNote(id) {
    if (selectedNotes.includes(id)) {
      setSelectedNotes((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedNotes((prevSelected) => [...prevSelected, id]);
    }
  }


  const deleteSelectedNotes = () => {
    // Include uid in the request payload to delete user-specific selected notes
    fetch('http://localhost:5000/api/notes/delete-selected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user?.uid,
        selectedIds: selectedNotes.map(index => notes[index]._id),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        const updatedNotes = notes.filter((_, index) => !selectedNotes.includes(index));
        setNotes(updatedNotes);
        setSelectedNotes([]);
      })
      .catch((error) => console.error('Error deleting selected notes:', error));
  };

  function onSelectAll() {
    if (selectAll) {
      setSelectedNotes([]);
    } else {
      const allNoteIds = notes.map((_, index) => index);
      setSelectedNotes(allNoteIds);
    }
    setSelectAll(!selectAll);
  }

  function NotesContent({
    notes,
    selectedNotes,
    onSelectAll,
    addNote,
    deleteSelectedNotes,
    deleteNote,
    selectNote,
  }) {
    return (
      <>
        <CreateArea
          onAdd={addNote}
          onDeleteSelected={deleteSelectedNotes}
          selectedNotes={selectedNotes}
          onSelectAll={onSelectAll}
        />
        <div className="note-list">
          {notes.map((noteItem, index) => {
            const isSelected = selectedNotes.includes(index);
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={() => deleteNote(index)}
                onSelect={() => selectNote(index)}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      </>
    );
  }

  
  return (
    <AuthProvider>
    <div>
      <Header nameFlag={name} />
      {notAuthenticated ? (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div> Not Found or You do not have permission.</div>} />
        </Routes>
      ) : (
        <Routes>
          <Route
                  path="/notes"
                  element={
                      <NotesContent
                        notes={notes}
                        selectedNotes={selectedNotes}
                        onSelectAll={onSelectAll}
                        addNote={addNote}
                        deleteSelectedNotes={deleteSelectedNotes}
                        deleteNote={deleteNote}
                        selectNote={selectNote}
                      />
                  }
                />
        </Routes>
      )}
      <Footer />
    </div>
    </AuthProvider>
  );
}

export default App;

