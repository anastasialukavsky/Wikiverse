import React, {useState, useEffect} from 'react'
import apiURL from '../api';



export default function ArticleForm({pages, setPages, fetchPages}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      const articleData = {
        title,
        content,
        name: authorName,
        email: authorEmail,
        tags: tags.split(' '),
      };

      try {
        const response = await fetch(`${apiURL}/wiki`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
        });
        console.log({response})

        // await response.json()
        if (!response.ok) {
          throw new Error('Failed to add article');
        }

        setTitle('');
        setContent('');
        setAuthorName('');
        setAuthorEmail('');
        setTags('');

        fetchPages()
      } catch (error) {
        console.error('Error adding article:', error.message);
      }
    };
  return (
    <section>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          Title:
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <label>
          Author Name:
          <input
            type='text'
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </label>
        <label>
          Author Email:
          <input
            type='email'
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />
        </label>
        <label>
          Tags:
          <input
            type='text'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
}
