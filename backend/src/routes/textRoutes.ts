import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getBooks, getChapters, getVerses } from '../controllers/textController';

const router = Router();

router.get('/books', asyncHandler(getBooks));
router.get('/books/:bookId/chapters', asyncHandler(getChapters));
router.get('/chapters/:chapterId/verses', asyncHandler(getVerses));

export default router;
