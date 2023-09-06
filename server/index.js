const express = require('express');
const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

const app = express();
const port = 5000;


const cors=require("cors");
const cookieParser=require("cookie-parser");
const bodyParser = require('body-parser');
const morgan=require("morgan");



//middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://mern-book-store-client.vercel.app', 'https://bookstore.nishantpatil.me/'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


// app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());

//DB connection
const connectionWithDB=require('./connection/DB');
connectionWithDB();

//routes
const bookRoute=require("./routes/bookRoute");
app.use("/api/v1",bookRoute);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
