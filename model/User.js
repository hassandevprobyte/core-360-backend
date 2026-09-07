const mongoose = require("mongoose");

// Constants
const MODELS = require("../constants/MODELS");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    companies: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: MODELS.COMPANY }],
      required: [true, "companies are required"],
      validate: {
        validator: (v) => v?.length > 0,
        message: "at least one company is required",
      },
    },
    brands: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: MODELS.BRAND }],
      required: [true, "brands are required"],
      validate: {
        validator: (v) => v?.length > 0,
        message: "at least one brand is required",
      },
    },
    roles: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: MODELS.ROLE }],
      required: [true, "roles are required"],
      validate: {
        validator: (v) => v?.length > 0,
        message: "at least one role is required",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(MODELS.USER, UserSchema);
