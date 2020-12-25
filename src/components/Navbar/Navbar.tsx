import React, { memo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FaGithub } from 'react-icons/fa';

function Navbar () {
  const [theme, setTheme] = useLocalStorage('dark-theme', document.body.className);

  function changeTheme () {
    setTheme((isDark) => {
      if (isDark === 'dark-theme') document.body.classList.remove('dark-theme');
      else document.body.className = 'dark-theme';

      return isDark === 'dark-theme' ? 'light-theme' : 'dark-theme';
    });
  }

  return (
    <nav className="navbar">
      <div>
        <h2>BlurHash Previewer</h2>
        <a href="https://github.com/gkampitakis/blurhash-previewer/blob/master/README.md" target="_blank" rel="noreferrer" aria-label="Github icon"><FaGithub /></a>
        <span onClick={changeTheme}>{theme === 'dark-theme' ? '🌞' : '🌙'}</span>
      </div>
    </nav>
  );
}

export default memo(Navbar);
