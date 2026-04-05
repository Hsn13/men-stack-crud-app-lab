const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Car = require("./models/Car");
const methodOverride = require("method-override");



app.use(methodOverride("_method"));
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

app.get('/cars/new', (req, res)=>{
  const categories = Car.schema.path('category').enumValues;
  res.render('new', { categories });
});

app.post("/new", async (req, res) => {
   try {
     await Car.create(req.body);
     res.redirect("/");
   } catch (error) {
     console.error(error);
     res.status(400).send("Error creating car: " + error.message);
   }
});

app.get("/", async (req, res) => {
  const allData = await Car.find({});
  res.render("homepage",{allData : allData}); 
});

app.get("/cars/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);
  const categories = Car.schema.path('category').enumValues;
  res.render("edit", { car, categories });
});

app.get('/test',  (req, res )=>{
console.log('test');
res.render('homepage');
});

app.put('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    car.modelName = req.body.modelName;
    car.year = req.body.year;
    car.category = req.body.category;
    await car.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating car: " + error.message);
  }
});

app.post('/cars/:id/delete', async (req, res) =>{
  await Car.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(3000,()=>
  {console.log("Connected successfuly to port 3000")
  });