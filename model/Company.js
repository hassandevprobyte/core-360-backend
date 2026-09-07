const mongoose = require("mongoose");

// Constants
const MODELS = require("../constants/MODELS");

const CompanySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "title is required"],
    },
    acronym: {
      type: String,
      uppercase: true,
      unique: true,
      trim: true,
      required: [true, "acronym is required"],
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(MODELS.COMPANY, CompanySchema);
