import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

/**
 * @async @function loginHandler
 */

const prisma = new PrismaClient();

export default async function loginHandler(req, res) {
  switch (req.method) {
    case "POST":
      return await findUser(req, res);
      break;
    default:
      return res.status(200).json("Nothing");
  }
}

//find user in database with email

const findUser = async (req, res) => {
  const { user_email, user_pass, role_id,user_name } = req.body;

  const user = await prisma.user.findMany({
    where: {
      user_email,
      role_id, // add role_id to the where clause
      user_name
    }
  });

  //check if user exists

  if (!user || !user.length) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  //check if password is correct

  const password = await bcrypt.compare(user_pass, user[0].user_pass);

  if (!password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  //create token and send it to the client

  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      user_email: user_email,
      role_id: user[0].role_id, // add role_id to the token payload
      user_name: user[0].user_name
    },
    "secret"
  );

  const serialized = serialize("Mytoken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });

  //set cookie

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json({
    message: "Login successful",
  });
};
