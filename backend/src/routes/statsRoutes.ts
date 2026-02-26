import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getDashboard, getDashboardDetailed, recordChant } from '../controllers/statsController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { chantSchema } from '../validation/schemas';

const router = Router();

router.use(authMiddleware);
router.post('/chant', validate(chantSchema), asyncHandler(recordChant));
router.get('/dashboard', asyncHandler(getDashboard));
router.get('/dashboard/details', asyncHandler(getDashboardDetailed));

export default router;
