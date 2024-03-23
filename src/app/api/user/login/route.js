import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import prisma from "@/app/lib/prisma";

const key = new TextEncoder().encode(process.env.SECRET_KEY);

export async function POST(request) {
    // Read data off req body
    const body = await request.json();
    const { email, password } = body;
  
    // Validate data
    if (!validateEmail(email) || !validatePassword(password)) {
      return Response.json(
        {
          error: "Invalid email or password",
        },
        { status: 400 }
      );
    }
  
    // Lookup the seller
    const seller = await prisma.seller.findFirst({
      where: {
        email,
      },
    });
  
    if (!seller) {
      return Response.json(
        {
          error: "Invalid email or password",
        },
        { status: 400 }
      );
    }
  
    // Compare password
    const isCorrectPassword = bcrypt.compareSync(password, seller.password);
    //const isCorrectPassword = password === seller.password;

    if (!isCorrectPassword) {
      return Response.json(
        {
          error: "Invalid email or password",
        },
        { status: 400 }
      );
    }
  
    // Create jwt token
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const alg = "HS256";
  
    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(seller.id.toString())
      .sign(secret);
  
    // Respond with it
    return Response.json({ token: jwt });
  }
  