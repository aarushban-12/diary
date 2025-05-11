import React, { useState } from "react";
import Navbar from "./Navbar";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    const habit = {
      id: Date.now(),
      name: newHabit,
      progress: Array(7).fill(false),
      weeksCompleted: 0,
    };
    setHabits([...habits, habit]);
    setNewHabit("");
  };

  const toggleDay = (habitId, dayIndex) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const updatedProgress = habit.progress.map((done, i) =>
          i === dayIndex ? !done : done
        );

        const isWeekComplete = updatedProgress.every((done) => done);

        return {
          ...habit,
          progress: isWeekComplete ? Array(7).fill(false) : updatedProgress,
          weeksCompleted: isWeekComplete ? habit.weeksCompleted + 1 : habit.weeksCompleted,
        };
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  return (
    <div>
        <Navbar />
 
    <div style={styles.container}>
      <h2 style={styles.title}>📅 Habit Tracker</h2>
      <div style={styles.inputGroup}>
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="e.g. Exercise"
          style={styles.input}
        />
        <button onClick={addHabit} style={styles.addBtn}>Add</button>
      </div>

      {habits.length === 0 ? (
        <p style={styles.empty}>No habits yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Habit</th>
              {daysOfWeek.map((day) => (
                <th key={day} style={styles.th}>{day}</th>
              ))}
              <th style={styles.th}>Weeks</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td style={styles.td}>{habit.name}</td>
                {habit.progress.map((done, i) => (
                  <td key={i} style={styles.td}>
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggleDay(habit.id, i)}
                    />
                  </td>
                ))}
                <td style={styles.td}>{habit.weeksCompleted}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    style={styles.deleteBtn}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 750,
    margin: "40px auto",
    padding: 20,
    fontFamily: "sans-serif",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
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
  addBtn: {
    padding: "10px 16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "#f0f0f0",
    padding: "8px",
    fontWeight: "600",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  },
  td: {
    textAlign: "center",
    padding: "8px",
    borderBottom: "1px solid #eee",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#dc3545",
    fontSize: 18,
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },
};

export default HabitTracker;
