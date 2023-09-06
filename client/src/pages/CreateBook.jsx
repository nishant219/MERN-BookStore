import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [publisher, setPublisher] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://bookstore-server-po8m.onrender.com/api/v1/create', {
        title,
        genre,
        author,
        year,
        pages,
        publisher,
      });
      enqueueSnackbar('Book created successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Error creating book', { variant: 'error' });
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <BackButton />
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-4">Create a New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-600 font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="genre" className="block text-gray-600 font-semibold">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-gray-600 font-semibold">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-gray-600 font-semibold">
              Publish Year
            </label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="pages" className="block text-gray-600 font-semibold">
              Pages
            </label>
            <input
              type="text"
              id="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="publisher" className="block text-gray-600 font-semibold">
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200"
            >
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
