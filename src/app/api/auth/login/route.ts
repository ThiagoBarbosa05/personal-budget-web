import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {cookies} from 'next/headers'
import { InvalidCredentialsError } from "@/utils/validation-error";

export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const loginBodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    })
    
    const {email, password} = loginBodySchema.parse(await req.json())
  
    const dataUserToSend = {
      email, password
    }
  
    const response = await fetch('https://personal-budget-api-3285.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(dataUserToSend)
    })

    if(!response.ok) {
      throw new InvalidCredentialsError()
    }
  
    const data = await response.json()
  
    const cookieStore  = cookies()
  
    cookieStore.set('next_token', data.token)
    cookieStore.set('next_refreshToken', data.refreshToken)
      
  
    return Response.json({})
  } catch(err) {
    if(err instanceof InvalidCredentialsError) {
      return new Response('Invalid credentials', {
        status: 400
      })
      
    }
  }
  
  return Response.json({})
}