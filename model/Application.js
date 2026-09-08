const mongoose = requier("mongoose");

// Constants
const MODELS = require("../constants/MODELS");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mongoUri: {
      type: String,
      required: [true, "mongo URI is required"],
    },
    clientId: {
      type: String,
      unique: true,
      required: [true, "client id is required"],
    },
    clientSecret: {
      type: String,
      required: [true, "client secret is required"],
    },
    redirectUri: {
      type: String,
      required: [true, "redirect URI is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(MODELS.APPLICATION, schema);
