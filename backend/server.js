import express from 'express';
import 'dotenv/config'; // You already have this — it's good
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_ID];
console.log('Server starting with allowedOrigins:', allowedOrigins); 

// Middleware
app.use((req, res, next) => {
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });

  next();
});

app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin); 
  console.log('Response Headers (after CORS):', res.getHeaders());
  next();
});

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/todos', todoRoutes);

// MongoDB connection and server start
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
