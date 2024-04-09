import React from 'react';
import './App.css';
import Routes from './component/Routes';
import { AuthProvider } from './component/AuthProvider';

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
