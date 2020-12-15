import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar (): ReactElement {
  return (
    <nav className="navbar">
      <div>
        <h1>Blurhash Previewer</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">Info</Link></li>
        </ul>
      </div>
    </nav>
  );
}
