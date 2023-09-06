import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { SnackbarProvider, useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.delete(`https://bookstore-server-po8m.onrender.com/api/v1/delete/${id}`);
      enqueueSnackbar('Book deleted successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Error deleting book', { variant: 'error' });
      console.error('Error deleting book:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-white shadow-md rounded p-4'>
          <h3 className='text-2xl mb-4'>Are you sure you want to delete book with ID: {id}?</h3>
          <button
            onClick={handleDeleteBook}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteBook;
