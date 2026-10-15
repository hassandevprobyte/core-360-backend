const allowedOrigins = ["*", "http://localhost:5172", "https://rv10n5m4-8004.inc1.devtunnels.ms/"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = { allowedOrigins, corsOptions };
