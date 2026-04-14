import express from 'express';
import { auth } from '../../common/middleware/auth.middleware.ts';
import { authorize } from '../../common/middleware/role.middleware.ts';
import { applyVendor, approveVen } from './vendor.controller.ts';

const router = express.Router()

router.post("/apply", auth, authorize("user"), applyVendor)

router.patch("/approve/:id", auth, authorize("admin"), approveVen)

export default router;