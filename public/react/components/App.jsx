import React, { useState, useEffect, useCallback } from 'react';
import { PagesList } from './PagesList';
import apiURL from '../api';
import ArticleForm from './ArticleForm';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [isAddingArticle, setIsAdingArticle] = useState(false);

 const fetchPages = useCallback(async () => {
   try {
     const response = await fetch(`${apiURL}/wiki`);
     if (!response.ok) {
       throw new Error('Failed to fetch articles');
     }
     const pagesData = await response.json();
     setPages(pagesData);
   } catch (err) {
     console.log('Oh no an error! ', err);
   }
 }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleClick = () => {
    setIsAdingArticle(true);
    // console.log({ isAddingArticle });
  };

  return (
    <main>
      {isAddingArticle ? (
        <ArticleForm pages={pages} setPages={setPages} fetchPages={fetchPages}/>
      ) : (
        <>
          <h1>WikiVerse</h1>
          <h2>An interesting 📚</h2>
          <PagesList pages={pages} fetchPages={fetchPages}/>
          <br />
          <button onClick={handleClick}>Add an Article</button>
        </>
      )}
    </main>
  );
};
