import express from "express";
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput } from "@decoded-satapathy/medium-common";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { User } from "../Interfaces/userInterface";

export const signUpRouter = express.Router();

const saltRounds = 10;

signUpRouter.post("/", async (req, res) => {

  const body = req.body;

  const { success } = signupInput.safeParse(body);

  if (!success) {
    return res.status(411).json({ msg: "Wrong input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const doesUserExists = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (doesUserExists) {
      return res.status(409).json({ msg: "Account already with same email" });
    }
    // let user: User | null = {
    //   id: "",
    //   email: "",
    //   password: "",
    //   name: ""
    // };
    bcrypt.hash(body.password, saltRounds, async (err, hash) => {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: hash,
          name: body.name
        }
      })

      console.log(user);

      if (process.env.JWT_SECRET) {
        if (user.id !== "") {
          const token = jwt.sign(user.id, process.env.JWT_SECRET);
          return res.status(200).json({ token: token });
        } else {
          return res.status(500).json({ msg: "User's ID is empty" });
        }
      } else {
        return res.status(500).json({ msg: "JWT secret missing" });
      }
    })

  } catch (e) {
    return res.status(500).json({ msg: "Something went wrong" });

  }


})

