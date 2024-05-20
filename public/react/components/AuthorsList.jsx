import React, { useEffect, useState } from 'react';
import apiURL from '../api';

export default function AuthorsList({setIsMainVisible}) {
  const [authors, setAuthors] = useState([]);
  const fetchAuthors = async () => {
    try {
      const response = await fetch(`${apiURL}/users/`);
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      setAuthors(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setIsMainVisible(false)
    fetchAuthors();
  }, []);

  return (
    <div>
      <div>
        <h1>List of Authors</h1>
        <ul>
          {authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
