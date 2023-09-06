import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookstore-server-po8m.onrender.com/api/v1/book/${id}`)
      .then((resp) => {
        setBook(resp.data);
        setLoading(false);
        console.log('book.data response:', resp.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  console.log("book object: ", book.data);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {Object.keys(book).length === 0 ? (
            <p className="text-gray-500 text-xl">No data available</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-600 text-xl font-semibold">Title:</label>
                <p className="text-xl text-gray-800">{book.data.title}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-xl font-semibold">Genre:</label>
                <p className="text-xl text-gray-800">{book.data.genre}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-xl font-semibold">Author:</label>
                <p className="text-xl text-gray-800">{book.data.author}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-xl font-semibold">Publish Year:</label>
                <p className="text-xl text-gray-800">{book.data.year}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-xl font-semibold">Publisher:</label>
                <p className="text-xl text-gray-800">{book.data.publisher}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-xl font-semibold">Last Update Time:</label>
                <p className="text-xl text-gray-800">{new Date(book.data.updatedAt).toLocaleString()}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowBook;
