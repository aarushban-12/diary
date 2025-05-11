import React, { useState } from "react";
import Navbar from "./Navbar";

function Diary() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    const now = new Date();
    const timestamp = now.toLocaleString(); // Date + Time
    setEntries([
      ...entries,
      { id: Date.now(), content: input, timestamp }
    ]);
    setInput("");
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div>
        <Navbar />
    <div style={styles.container}>
      <h2 style={styles.title}>📔 My Personal Diary</h2>

      <div style={styles.entryBox}>
        <textarea
          placeholder="Write your thoughts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.textarea}
          rows={4}
        />
        <button onClick={handleAdd} style={styles.addButton}>Add Entry</button>
      </div>

      <div style={styles.entryList}>
        {entries.length === 0 ? (
          <p style={styles.empty}>No entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} style={styles.entry}>
              <div style={styles.timestamp}>{entry.timestamp}</div>
              <div style={styles.content}>{entry.content}</div>
              <button
                onClick={() => handleDelete(entry.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  entryBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 30,
  },
  textarea: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
    resize: "none",
  },
  addButton: {
    alignSelf: "flex-end",
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 16,
  },
  entryList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  entry: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    position: "relative",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  content: {
    fontSize: 15,
    whiteSpace: "pre-wrap",
  },
  deleteButton: {
    position: "absolute",
    right: 15,
    top: 15,
    background: "transparent",
    border: "none",
    color: "#dc3545",
    fontWeight: "bold",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
};

export default Diary;
