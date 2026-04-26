import express from 'express';
import { create, get, updateCat, deleteCat } from './category.controller.ts';
import { auth } from '../../common/middleware/auth.middleware.ts';
import { authorize } from '../../common/middleware/role.middleware.ts';

const router = express.Router()

router.post("/create", auth, authorize("admin"), create)

router.get("/get", get)

router.put("/:id", auth, authorize("admin"), updateCat)

router.delete("/:id", auth, authorize("admin"), deleteCat)

export default router