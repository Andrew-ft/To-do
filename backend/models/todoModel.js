import mongoose from "mongoose";
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
    }
}, { timestamps: true });

export default mongoose.model('Todo', todoSchema);