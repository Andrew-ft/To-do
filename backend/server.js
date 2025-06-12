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
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://todo-khaki-psi.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);
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
