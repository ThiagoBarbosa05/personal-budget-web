"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { InvalidCredentialsError } from "@/utils/validation-error";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Please enter your password." }),
});

export type Login = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const [isInvalidCredentials, setIsInvalidCredentials] = useState('')

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: Login) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if(!response.ok) {
        throw new InvalidCredentialsError()
      }

      router.refresh()
    } catch (err) {
      if(err instanceof InvalidCredentialsError) {
        setIsInvalidCredentials(err.message)
      }
    }

  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-2"
      >
        <div>
          <Label className="block pb-1">Email:</Label>
          <Input
            className="mb-2"
            placeholder="johndoe@example.com"
            {...register("email")}
          />
          <span className="block mt-1 text-sm text-red-500">
            {errors.email?.message}
          </span>
        </div>

        <div>
          <Label className="block pb-1">Password:</Label>
          <Input
            type="password"
            className="mb-2"
            placeholder="your password"
            {...register("password")}
          />
          <span className="block mt-1 text-sm text-red-500">
            {errors.password?.message}
          </span>
        </div>
        {isInvalidCredentials ? <div className="bg-destructive p-1 rounded-sm text-center">
          <span className="text-sm">{isInvalidCredentials}</span>
        </div> : ''}
        

        <Button disabled={isSubmitting}>
        {isSubmitting ? (
           <span className="flex items-center justify-center">
            <span className="border-t-2 border-r-2 border-zinc-800 border-solid h-5 w-5 rounded-full animate-spin"></span>
           </span>
          ) : (
            "login"
          )}
        </Button>
      </form>
    </div>
  );
}
