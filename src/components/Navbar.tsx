import React, { ReactElement } from 'react';

export default function Navbar (): ReactElement {
  return (
    <nav className="navbar">
      <div>
        <h1>Blurhash Previewer</h1>
        <ul>
          <li><a href="">Home</a></li>
          <li><a href="">Info</a></li>
        </ul>
      </div>
    </nav>
  );
}
