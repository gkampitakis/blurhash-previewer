import React, { lazy, Suspense } from 'react';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import { AppProvider } from './context';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './app.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const About = lazy(() => import('./Pages/About'));

function App () {
  return (
    <main className="app">
      <AppProvider>
        <Router>
          <ToastContainer />
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' render={() =>
              <Suspense fallback={'Loading ...'}><About /></Suspense >}
            />
          </Switch>
        </Router>
      </AppProvider>
    </main>
  );
}

export default App;
