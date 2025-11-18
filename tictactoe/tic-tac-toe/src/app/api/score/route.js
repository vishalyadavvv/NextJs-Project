import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  await connectDB();
  const { score } = await req.json();
  const token = req.cookies.get("token")?.value;

  const data = jwt.verify(token, process.env.JWT_SECRET);

  await User.findByIdAndUpdate(data.id, { $inc: { score } });

  return Response.json({ success: true });
}
