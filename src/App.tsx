import React from 'react';
import { UserForm } from './components/UserForm';
import Notifications from 'react-notify-toast';
import './App.css';

function App() {
  return (
    <div className="App">
      <UserForm />
      <Notifications />
    </div>
  );
}

export default App;
