const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      minLength: 2,
      maxLength: 15,
      required: true,
    },
    year: {
      type: Number,
      default: 2000,
      required: true,
    },
    colour: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Sedan", "SUV", "Hatchback", "Truck", "Coupe", "Convertible"],
      default: "Sedan", 
    },
  },
  { timestamps: true },
); 

module.exports = mongoose.model("Car", carSchema);
