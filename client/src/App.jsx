import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBook />} />
        <Route path="/book/:id" element={<ShowBook />} />
        <Route path="/update/:id" element={<UpdateBook />} />
        <Route path="/delete/:id" element={<DeleteBook />} />
      </Routes>
    </>
  )
}

export default App