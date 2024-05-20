import React, { useState, useEffect } from 'react';
import apiURL from '../api';
// import { Link } from 'react-router-dom';

export default function Navbar({handleNavigation}) {
    return (
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('authors')}>Authors</button>
          </li>
        </ul>
      </nav>
    );
}
