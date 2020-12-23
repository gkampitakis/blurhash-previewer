import React, { memo } from 'react';
import NavLink from './NavLink';
import { FaGithub } from 'react-icons/fa';

function Navbar () {
  return (
    <nav className="navbar">
      <div>
        <h2>Blurhash Previewer</h2>
        <ul>
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink exact to="/about">Info</NavLink></li>
        </ul>
        <a href="https://github.com/gkampitakis/blurhash-previewer/blob/master/README.md" target="_blank" rel="noreferrer" aria-label="Github icon"><FaGithub /></a>
      </div>
    </nav>
  );
}

export default memo(Navbar);
