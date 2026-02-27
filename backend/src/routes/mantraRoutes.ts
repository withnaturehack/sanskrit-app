import { Router } from 'express';
import { getMantra, getMantras } from '../controllers/mantraController';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateObjectId } from '../middleware/validateObjectId';

const router = Router();

router.get('/', asyncHandler(getMantras));
router.get('/:id', validateObjectId('id'), asyncHandler(getMantra));

export default router;
