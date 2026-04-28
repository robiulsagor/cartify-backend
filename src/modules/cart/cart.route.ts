import express from 'express';
import { auth } from '../../common/middleware/auth.middleware.ts';
import { add, get, update, remove } from './cart.controller.ts';

const router = express.Router()

router.post("/create", auth, add)

router.get("/get", auth, get)

router.put("/update", auth, update)

router.delete("/:id", auth, remove)

export default router