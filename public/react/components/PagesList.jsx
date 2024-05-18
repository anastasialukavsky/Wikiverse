import React, { useState } from 'react';
import { Page } from './Page';

export const PagesList = ({ pages, fetchPages }) => {
  const [selectedPage, setSelectedPage] = useState(null);

  const handleClick = (slug) => {
    setSelectedPage(slug);
  };

  const handleBackToList = () => {
    setSelectedPage(null);
  };

  if (selectedPage) {
    return (
      <div>
        <button onClick={handleBackToList}>Back to Wiki List</button>
        <Page slug={selectedPage} fetchPages={fetchPages}/>
      </div>
    );
  }

  console.log({ pages });

  return (
    <>
      <h1>Wiki List</h1>
			<br/>
      {pages.map((page, idx) => (
        <h3 key={page.slug} onClick={() => handleClick(page.slug)}>
          {page.title}
        </h3>
      ))}
    </>
  );
};
