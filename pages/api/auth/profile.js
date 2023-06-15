import jwt from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { Mytoken } = req.cookies;
  
  if (!Mytoken) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const {user_email, user_name, role_id,id} = jwt.verify(Mytoken, 'secret');
  return res.status(200).json({ user_email, user_name, role_id,id });
}