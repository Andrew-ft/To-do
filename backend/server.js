import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.Mongo_URL;

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://to-do-nu-lyart.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

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
