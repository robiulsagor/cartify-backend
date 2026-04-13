import express from 'express';
import { auth } from '../../common/middleware/auth.middleware.ts';
import { applyForVendor, approveVendor } from './vendor.service.ts';
import { authorize } from '../../common/middleware/role.middleware.ts';

const router = express.Router()

router.post("/apply", auth, authorize("user"), applyForVendor)

router.patch("/approve/:id", auth, authorize("admin"), approveVendor)

export default router;