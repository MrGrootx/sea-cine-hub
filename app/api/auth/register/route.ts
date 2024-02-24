import { connectToDatabase } from "@lib/mongoDb";
import User from "@models/User";
import { NextRequest } from "next/server";

import { hash } from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { username, email, password } = await req.json();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }
    const hashedPassword = await hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return new Response(JSON.stringify(newUser), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
