import express from 'express';
import todoController from '../controllers/todoController.js';
import handleErrorMessage from '../middlewares/handleErrorMessage.js';
import { body } from 'express-validator';

const router= express.Router();

router.post('',[
    body('title').notEmpty(),
    body('completed').notEmpty(),
    body('priority').notEmpty()
], handleErrorMessage, todoController.store);

router.get('', todoController.index);
router.patch('/:id', todoController.update);
router.delete('/:id', todoController.destroy);

export default router;