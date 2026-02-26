import { Router } from 'express';
import { getMantra, getMantras } from '../controllers/mantraController';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getMantras));
router.get('/:id', asyncHandler(getMantra));

export default router;
