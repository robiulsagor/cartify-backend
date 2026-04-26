

import express from 'express';
import { getAll, getSingleProduct, create, myProducts, update } from './product.controller.ts';
import { auth } from '../../common/middleware/auth.middleware.ts';
import { authorize } from '../../common/middleware/role.middleware.ts';

const router = express.Router()

router.get("/", getAll)
router.get("/:id", getSingleProduct)

router.post("/create", auth, authorize("vendor"), create)
router.get("/my-products", auth, authorize("vendor"), myProducts)
router.patch("/:id", auth, authorize("vendor"), update)

export default router;