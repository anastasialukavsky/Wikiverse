import React, { useState, useEffect } from 'react';
import apiURL from '../api';

export const Page = ({ slug, fetchPages, setIsAddingArticle }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsAddingArticle(false)
        const response = await fetch(`${apiURL}/wiki/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();

    return () => {
      setArticle(null);
    };
  }, [slug]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      await fetchPages();
    } catch (error) {
      console.error('Error deleting article:', error.message);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{article.title}</h2>
      <p>
        <b>Author: </b> {article.author.name}
      </p>
      <p>{article.content}</p>
      <p>
        <b>Tags:</b> {article.tags.map((tag) => tag.name).join(', ')}
      </p>
      <p>
        <b>Published: </b> {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <button className='delete-btn' onClick={handleDelete}>Delete</button>
    </>
  );
};
