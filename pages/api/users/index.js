import { json } from "express";

const path = require("path");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await listUsers(req, res);
      break;

    case "POST":
      return await createUser(req, res);
      break;

    default:
      return res.status(200).json("Nothing");
  }

}

const listUsers = async (req, res) => {
    const users = await prisma.user.findMany(
        {
            include: {
                role: true,
            }
        }
    );
    return res.json(users);
}

const createUser = async (req, res) => {
    const { user_email, user_name, user_pass, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(user_pass, 10);
    const user = await prisma.user.create({
        data: {
        user_email,
        user_name,
        user_pass: hashedPassword,
        role_id: parseInt(role_id),
        },
    });
    return res.json(user);
}

