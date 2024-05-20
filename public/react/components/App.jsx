import React, { useState, useEffect, useCallback } from 'react';
import { PagesList } from './PagesList';
import apiURL from '../api';
import ArticleForm from './ArticleForm';
import Navbar from './Navbar';
import AuthorsList from './AuthorsList';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [isMainVisible, setIsMainVisible] = useState(true);

  const fetchPages = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const pagesData = await response.json();
      setPages(pagesData);
      // setIsMainVisible(true)
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleClick = () => {
    setIsAddingArticle(true);
  };

  const handleFormSubmit = () => {
    setIsAddingArticle(false);
    fetchPages();
  };

  const handleNavigation = (destination) => {
    setCurrentPage(destination);
    setIsMainVisible(false)
    setIsAddingArticle(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'authors':
        return <AuthorsList setIsMainVisible={setIsMainVisible}/>;
      case 'home':
        return (
          <PagesList
            pages={pages}
            fetchPages={fetchPages}
            setIsAddingArticle={setIsAddingArticle}
          />
        );
      default:
        return <h1>Welcome to WikiVerse!</h1>;
    }
  };

  return (
    <main className="main-wrapper">
      <div>
        <Navbar handleNavigation={handleNavigation}/>
        {renderPage()}
      </div>

      {isAddingArticle  ? (
        <ArticleForm onSubmit={handleFormSubmit} />
      ) : (
        <div className='pages'>
        {isMainVisible &&
          <PagesList
          pages={pages}
          fetchPages={fetchPages}
          setIsAddingArticle={setIsAddingArticle}
          />
        }
          <br />
          <button className='add-article-btn' onClick={handleClick}>Add an Article</button>
          </div>
          )}
    </main>
  );
};
