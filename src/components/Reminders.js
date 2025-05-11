import React, { useState } from "react";
import Navbar from "./Navbar";

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [input, setInput] = useState("");

  const addReminder = () => {
    if (input.trim() === "") return;
    const now = new Date();
    const timestamp = now.toLocaleString();
    const newReminder = {
      id: Date.now(),
      text: input,
      timestamp,
      completed: false,
    };
    setReminders([...reminders, newReminder]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addReminder();
  };

  return (
    <div>
        <Navbar />
    <div style={styles.container}>
      <h2 style={styles.title}>✅ Reminders</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Don't forget to..."
          style={styles.input}
        />
        <button onClick={addReminder} style={styles.button}>Add</button>
      </div>
      <ul style={styles.list}>
        {reminders.length === 0 ? (
          <p style={styles.empty}>No reminders yet.</p>
        ) : (
          reminders.map((reminder) => (
            <li key={reminder.id} style={styles.item}>
              <input
                type="checkbox"
                checked={reminder.completed}
                onChange={() => toggleComplete(reminder.id)}
                style={styles.checkbox}
              />
              <div style={{ ...styles.textBlock, ...(reminder.completed && styles.completed) }}>
                <span style={styles.text}>{reminder.text}</span>
                <span style={styles.time}>{reminder.timestamp}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "30px auto",
    padding: 20,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  button: {
    padding: "10px 16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    background: "#f5f5f5",
    padding: "12px 14px",
    marginBottom: 10,
    borderRadius: 8,
    gap: 10,
  },
  checkbox: {
    marginTop: 5,
    transform: "scale(1.2)",
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "90%",
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  completed: {
    opacity: 0.5,
    textDecoration: "line-through",
  },
  empty: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },
};

export default Reminders;
