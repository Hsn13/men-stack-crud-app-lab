const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs"); 

//DB connection

const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!!");
  }catch(error){
    console.log("Error occured", error);
    process.exit(1);
  }
};
connectDB();

//Routes

app.get("/", (req, res) => {
  res.render("homepage"); 
});

app.get('/test',  (req, res )=>{
console.log('test');
res.render('homepage');
});


app.listen(3000,()=>
  {console.log("Connected successfuly to port 3000")
  });