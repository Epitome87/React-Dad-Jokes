import React from 'react';
import './App.css';
import JokePage from './components/JokePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router basename='/'>
      <Routes>
        <Route path='/' element={<JokePage />} />
      </Routes>
    </Router>
  );
};

export default App;
