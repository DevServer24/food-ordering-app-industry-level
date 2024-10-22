// routes/auth.ts

import express from 'express';
import SignUpController from './sign-up.controller';
import SignInController from './sign-in.controller'
const router = express.Router();

// Sign-up route
router.post('/sign-up',SignUpController);
router.post('/sign-in',SignInController)

export default router;
