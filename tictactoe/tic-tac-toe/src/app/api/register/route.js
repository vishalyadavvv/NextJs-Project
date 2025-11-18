import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashed,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

