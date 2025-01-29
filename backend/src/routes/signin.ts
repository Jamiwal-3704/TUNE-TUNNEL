import express from "express";
import { PrismaClient, User } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput } from "@decoded-satapathy/medium-common";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const signInRouter = express.Router();

signInRouter.post("/", async (req, res) => {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = req.body;
  const { success } = signinInput.safeParse(body);

  if (!success) {
    return res.status(403).json({ "msg": "Invalid input" });
  }

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        name: true,
        id: true,
        password: true,
        email: true
      }
    })

    if (user) {
      bcrypt.compare(body.password, user?.password, (err, result) => {
        if (!result) {
          return res.status(403).json({ msg: "Wrong password" });
        }
      })
    }

    // console.log(user);

    if (user && process.env.JWT_SECRET) {
      const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
      return res.status(200).json({ token: token, id: user.id });
    } else {
      return res.status(404).json({ msg: "User doesn't exist or Wrong jwt" });
    }

  } catch (e) {
    return res.status(500).json({ msg: "Some error occured" });

  }

})

