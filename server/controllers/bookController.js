const express = require('express');
const router = express.Router();
const bigPromise=require("../middlewares/bigPromise");
const customError=require("../utils/customError");
const bookModel=require("../models/bookModel");


//home
exports.home=bigPromise(async(req,res,next)=>{
    console.log("home");
    res.status(200).json({
        success:true,
        message:"Welcome to the home page"
    });
});

//create book
exports.createBook=bigPromise(async(req,res,next)=>{

    const{title, author, genre, year, pages, publisher}=req.body;
    if(!title || !author || !genre || !year || !pages || !publisher){
        return next(new customError("Please provide all the required fields", 400));
    }
    const newBook=new bookModel({
        title, author, genre, year, pages, publisher
    });
    //console.log(newBook);
    const book=await newBook.save();
    res.status(201).json({
        success:true,
        data:book
    });

});


//get all books
exports.getAllBooks=bigPromise(async(req,res,next)=>{
    const books=await bookModel.find();
    res.status(200).json({
        success:true,
        count:books.length,
        data:books
    });
});


//get single book
exports.getSingleBook=bigPromise(async(req,res,next)=>{
    const book=await bookModel.findById(req.params.id);
    if(!book){
        return next(new customError(`Book with id ${req.params.id} not found`, 404));
    }
    res.status(200).json({
        success:true,
        data:book
    });
});


// Update book
exports.updateBook = bigPromise(async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const { title, author, genre, year, pages, publisher } = req.body;
  
      if (!bookId) {
        return next(new customError("Please provide book id", 400));
      }
      if (!title || !author || !genre || !year || !pages || !publisher) {
        return next(new customError("Please provide all the required fields", 400));
      }
  
      const updatedBook = await bookModel.findByIdAndUpdate(bookId, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedBook) {
        return next(new customError(`Book with id ${req.params.id} not found`, 404));
      }
  
      res.status(200).json({
        success: true,
        data: updatedBook,
      });
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate key error handling for title field
        return next(
          new customError("A book with the same title already exists.", 400)
        );
      } else {
        // Handle other errors or rethrow this error
        console.error('Error during update:', error);
        return next(error);
      }
    }
  });
  


//delete book
exports.deleteBook=bigPromise(async(req,res,next)=>{
    const bookId=req.params.id;
    if(!bookId){
        return next(new customError("Please provide book id", 400));
    }
    const deletedBook=await bookModel.findByIdAndDelete(bookId);
    if(!deletedBook){
        return next(new customError(`Book with id ${req.params.id} not found`, 404));
    }
    res.status(200).json({
        message:`Book with id ${req.params.id} deleted successfully`,
        success:true,
    });
});
