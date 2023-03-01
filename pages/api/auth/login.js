import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
  const { user_email, user_pass } = req.body;

  if (user_email === "jose@mail.com" && user_pass === "2398") {
    // expire in 30 days
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        user_email : user_email,
        user_pass : user_pass

      },
      'secret'
    );

    const serialized = serialize("Mytoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
