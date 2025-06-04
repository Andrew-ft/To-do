import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.Mongo_URL;
app.use(express.json());
app.use(morgan('dev'));
mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
})

app.use('/api/todos', todoRoutes);