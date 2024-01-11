import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { UserAlreadyExistsError } from "@/utils/validation-error";


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const registerBodySchema = z.object({
      username: z.string().min(1, { message: "Please enter a username." }),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." }),
    });
  
    const { email, password, username } = registerBodySchema.parse(await req.json());
  
    const dataUserToSend = {
      email,
      password,
      username
    };
  
    const response = await fetch(
      `${process.env.BASE_API_URL}/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataUserToSend),
      }
    );

    if(!response.ok) {
      throw new UserAlreadyExistsError()
    }
  
    const data = await response.json();
  
    const cookieStore = cookies();
  
    cookieStore.set("next_token", data.token);
    cookieStore.set("next_refreshToken", data.refreshToken);
  
    return Response.json(data)
  } catch (err) {
    if(err instanceof UserAlreadyExistsError) {
      return new Response(err.message, {
        status: 400
      })
    }
  }
  
}
