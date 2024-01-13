import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface JwtPayload {
  exp: number;
}

export async function middleware(request: NextRequest) {
  const refreshToken = cookies().get("next_refreshToken")?.value;
  const token = cookies().get("next_token")?.value;

  if (!token) {
    NextResponse.json({ message: "invalid token." });
  }

  const decodedToken = decode(token!) as JwtPayload;
  const expirationLimit = 5 * 60 * 1000;

  if (token && decodedToken.exp * 1000 - Date.now() < expirationLimit) {
    try {
      const response = await fetch(
        `${process.env.BASE_API_URL}/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const newToken = await response.json();

      const nextResponse = NextResponse.next();

      nextResponse.cookies.set("next_token", newToken.accessToken);

      return nextResponse;
    } catch (err) {
      console.log(err);
    }
  }
}