import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 400 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return Response.json({ error: "Wrong password" }, { status: 400 });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`,
    },
  });
}
