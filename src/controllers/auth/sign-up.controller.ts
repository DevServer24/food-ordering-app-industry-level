
import { Request, Response } from "express";
import prisma from "../../db/prisma";
import bcrypt from 'bcryptjs';

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

const SignUpController = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: SignUpProps = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Return success response
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error:any) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
};

export default SignUpController;
