import express, { Request, Response } from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../services/password';

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        emai: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Save it to session object

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
