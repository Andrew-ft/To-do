import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.Mongo_URL;

const allowedOrigins = [
  'https://to-do-nu-lyart.vercel.app', // your deployed frontend on Vercel
  'http://localhost:5173' // local frontend for development
];

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman or curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});

app.use('/api/todos', todoRoutes);
