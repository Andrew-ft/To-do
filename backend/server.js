import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.Mongo_URL;

const allowedOrigins = [
  'https://to-do-nu-lyart.vercel.app',  // your deployed frontend on Vercel
  'http://localhost:5173',               // local frontend (Vite default port)
];

// CORS Middleware with whitelist
app.use(cors({
  origin: function(origin, callback) {
    console.log('Incoming request from origin:', origin);
    // Allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: Access denied from origin ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/todos', todoRoutes);

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
