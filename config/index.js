const connectDB = require("./db");
const { corsOptions } = require("./cors");
const env = require("./env");

module.exports = { connectDB, corsOptions, env };
