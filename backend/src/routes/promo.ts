import { Router } from 'express';
import { validatePromo } from '../controllers/promoController';

const router = Router();

router.post('/validate', validatePromo);

export default router;