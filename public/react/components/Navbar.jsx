import React from 'react';

export default function Navbar({handleNavigation}) {
    return (
      <nav className="navbar">
        <ul className='link-list'>
          <li>
            <button className="link-btn" onClick={() => handleNavigation('authors')}>Authors</button>
          </li>
          <li>
            <button className='link-btn' onClick={() => handleNavigation('home')}>Home</button>
          </li>
        </ul>
      </nav>
    );
}
