import { Router } from 'express';
import userController from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { userValidationSchema } from '../validators/userValidator';

const router = Router();

router.post('/register', validateRequest(userValidationSchema), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:username', userController.getUser);

export default router;
