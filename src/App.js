import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Diary from './components/Diary';
import Reminders from './components/Reminders';
import HabitTracker from './components/HabitTracker';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Diary />} />
        <Route path='/reminders' element={<Reminders />} />
        <Route path='/habit' element={<HabitTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
