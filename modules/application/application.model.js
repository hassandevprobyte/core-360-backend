const mongoose = require("mongoose");

// Constants
const MODELS = require("../../constants/MODELS");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "title is required"],
    },
    clientId: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: [true, "client ID is required"],
    },
    audience: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: [true, "audience is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(MODELS.APPLICATION, schema);
