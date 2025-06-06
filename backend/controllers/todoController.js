import todoModel from '../models/todoModel.js';
import mongoose from 'mongoose';

const todoController = {
    index: async(req, res) => {
        let todo = await todoModel.find().sort({ createdAt: -1 });
        if(!todo) {
            return res.status(404).json({ message: "No todos found" });
        }
        return res.json(todo)
    },
    store: async(req, res) => {
        try {
            const { title, completed, priority } = req.body;
            const todo = await todoModel.create({
                title,
                completed,
                priority
            });
            return res.json(todo);
        } catch (e) {
            return res.status(400).json({ message: "Invalid Input" });
        }
    }, 
    update: async(req, res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            let newTodo = await todoModel.findByIdAndUpdate(
                id, 
                { ...req.body },
                { new: true } // Add this option to return the updated document
            );
            if(!newTodo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            return res.json(newTodo);
        } catch (e) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    destroy: async(req, res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            let newTodo = await todoModel.findByIdAndDelete(id);
            if(!newTodo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            return res.json(newTodo);
        } catch (e) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }, 
}

export default todoController;