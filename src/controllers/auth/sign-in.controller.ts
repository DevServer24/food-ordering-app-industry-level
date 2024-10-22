import { Request, Response } from "express";
import prisma from '../../db/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface SignInProps {
  email: string;
  password: string;
}

const SignInController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: SignInProps = req.body;
    
    // Basic validation
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return; // Ensure the function exits after sending the response
    }

    // Check if user exists
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user || !user.password) {
      res.status(404).json({ message: "User not found or password not set." });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    // Optionally generate a JWT token for authentication
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret', 
      { expiresIn: '1h' }
    );

    // Return success response with token and user details
    res.status(200).json({
      message: "Login successful.",
      token,  // Return token for client to use in future requests
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "An error occurred during sign-in." });
  }
};

export default SignInController;
