import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getBooks, getChapters, getVerses } from '../controllers/textController';
import { validateObjectId } from '../middleware/validateObjectId';

const router = Router();

router.get('/books', asyncHandler(getBooks));
router.get('/books/:bookId/chapters', validateObjectId('bookId'), asyncHandler(getChapters));
router.get('/chapters/:chapterId/verses', validateObjectId('chapterId'), asyncHandler(getVerses));

export default router;
