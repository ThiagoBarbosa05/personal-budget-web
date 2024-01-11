import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface JwtPayload {
  exp: number;
}


export async function POST(req: NextRequest, res: NextResponse) {
  const token = cookies().get("next_token")?.value;
  const {refreshToken} = await req.json()

  if (!token) {
    throw new Error();
  }

  const decodedToken = decode(token) as JwtPayload;
  const expirationLimit = 5 * 60 * 1000;

  try {
    if (decodedToken.exp * 1000 - Date.now() < expirationLimit) {
      const response = await fetch(
        `${process.env.BASE_API_URL}/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({refreshToken}),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const newToken = await response.json();

      cookies().set("next_token", newToken.accessToken);

      console.log(newToken.accessToken)
    }

    return new Response('success', {
      status: 200
    })
  } catch (err) {
    return new Response('error', {status: 400})
  }
}