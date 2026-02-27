import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getAlarms, patchAlarm, postAlarm, removeAlarm } from '../controllers/alarmController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { validateObjectId } from '../middleware/validateObjectId';
import { alarmPatchSchema, alarmSchema } from '../validation/schemas';

const router = Router();

router.use(authMiddleware);
router.get('/', asyncHandler(getAlarms));
router.post('/', validate(alarmSchema), asyncHandler(postAlarm));
router.patch('/:id', validateObjectId('id'), validate(alarmPatchSchema), asyncHandler(patchAlarm));
router.delete('/:id', validateObjectId('id'), asyncHandler(removeAlarm));

export default router;
