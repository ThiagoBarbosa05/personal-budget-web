"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { UserAlreadyExistsError } from "@/utils/validation-error";
import { useState } from "react";

const registerSchema = z.object({
  username: z.string().min(1, { message: "Please enter a username." }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type Register = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [ifUserAlreadyExists, setIfUserAlreadyExists] = useState("");

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: Register) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new UserAlreadyExistsError();
      }

      router.push("/home");
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        setIfUserAlreadyExists(err.message);
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
          <Label className="block pb-1">Username:</Label>
          <Input
            className="mb-2"
            placeholder="ex: johndoe"
            {...register("username")}
          />
          <span className="block mt-1 text-sm text-red-500">
            {errors.username?.message}
          </span>
        </div>

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
          <span className="block mt-1 text-sm text-red-500">
            {ifUserAlreadyExists}
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

        <Button disabled={isSubmitting}>
          {isSubmitting ? (
           <span className="flex items-center justify-center">
            <span className="border-t-2 border-r-2 border-zinc-800 border-solid h-5 w-5 rounded-full animate-spin"></span>
           </span>
          ) : (
            "Create an account"
          )}
        </Button>
      </form>
    </div>
  );
}
