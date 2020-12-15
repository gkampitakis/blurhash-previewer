import React from 'react';
import ControlPanel from './components/ControlPanel';
import ImagePreviewer from './components/ImagePreviewer';
import Navbar from './components/Navbar';
import { AppProvider } from './context';
import './app.scss';

function App () {
  return (
    <main className="app">
      <AppProvider>
        <Navbar />
        <div className="main_container">
          <ControlPanel />
          <ImagePreviewer />
        </div>
      </AppProvider>
    </main>
  );
}

export default App;
