const express=require("express");
const router=express.Router();
const bigPromise=require("../middlewares/bigPromise");

const{ createBook, getAllBooks, getSingleBook, updateBook, deleteBook }=require("../controllers/bookController");


router.route("/create").post(createBook);
router.route("/allbooks").get(getAllBooks);
router.route("/book/:id").get(getSingleBook);
router.route("/update/:id").put(updateBook);
router.route("/delete/:id").delete(deleteBook);

module.exports=router;