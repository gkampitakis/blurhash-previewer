import React from 'react';
import Home from './Home';
import Navbar from './components/Navbar/Navbar';
import { AppProvider } from './context';
import './app.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  return (
    <main className="app">
      <AppProvider>
        <ToastContainer />
        <Navbar />
        <Home />
      </AppProvider>
    </main>
  );
}

export default App;
