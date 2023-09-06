import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { SnackbarProvider, useSnackbar } from 'notistack';

const UpdateBook = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [publisher, setPublisher] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://bookstore-server-po8m.onrender.com/api/v1/book/${id}`);
        const { title, genre, author, year, pages, publisher } = res.data.data;
        setTitle(title);
        setGenre(genre);
        setAuthor(author);
        setYear(year);
        setPages(pages);
        setPublisher(publisher);
      } catch (error) {
        enqueueSnackbar('Error fetching book', { variant: 'error' });
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const handleEditBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`https://bookstore-server-po8m.onrender.com/api/v1/update/${id}`, {
        title,
        genre,
        author,
        year,
        pages,
        publisher,
      });
      navigate('/');
      enqueueSnackbar('Book updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error updating book', { variant: 'error' });
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Update Book</h1>
      <form onSubmit={handleEditBook}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="text-xl text-gray-500">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="genre" className="text-xl text-gray-500">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="author" className="text-xl text-gray-500">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="year" className="text-xl text-gray-500">
              Publish Year
            </label>
            <input
              type="text"
              name="year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="pages" className="text-xl text-gray-500">
              Pages
            </label>
            <input
              type="text"
              name="pages"
              id="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="publisher" className="text-xl text-gray-500">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
