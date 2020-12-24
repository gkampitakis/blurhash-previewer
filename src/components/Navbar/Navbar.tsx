import React, { memo } from 'react';
import { FaGithub } from 'react-icons/fa';

function Navbar () {
  return (
    <nav className="navbar">
      <div>
        <h2>BlurHash Previewer</h2>
        <a href="https://github.com/gkampitakis/blurhash-previewer/blob/master/README.md" target="_blank" rel="noreferrer" aria-label="Github icon"><FaGithub /></a>
      </div>
    </nav>
  );
}

export default memo(Navbar);
