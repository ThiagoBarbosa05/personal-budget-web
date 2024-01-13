/* eslint-disable react/no-unescaped-entities */
import { LoginForm } from "@/components/form/login-form";
import { RegisterForm } from "@/components/form/register-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CurrencyDollarSimple, Warning } from "@phosphor-icons/react/dist/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";

export default function page() {
  const cookie = cookies().get("next_token");

  if (cookie) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen p-6 w-full max-w-[480px] mx-auto flex flex-col justify-center">
      <div className="text-2xl sm:text-3xl flex items-center justify-center mb-6 gap-2">
        <CurrencyDollarSimple color="#00B37E" weight="bold" />
        <span className=" font-bold">Personal Budget</span>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="flex flex-col justify-center items-center">
            <CardHeader></CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold leading-6 text-center">
                Login
              </h3>
              <p className="mt-2 text-sm text-zinc-400 text-center">
                Enter your email and password to access your account.
              </p>
              <LoginForm />
            </CardContent>
            <CardFooter>
              <Alert>
                <Warning size={16} />
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>
                  If there is an error when logging in or registering, it is
                  because the server is being started, as the application is
                  hosted on a free Render account. Reload the page or wait a few
                  seconds and enter the data again
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card className="flex flex-col justify-center items-center">
            <CardHeader></CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold leading-6 text-center">
                Register
              </h3>
              <p className="mt-2 text-sm text-zinc-400 text-center">
                Please enter your details to create your account.
              </p>

              <RegisterForm />
            </CardContent>
            <CardFooter>
              <Alert>
                <Warning size={16} />
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>
                  This application was made for educational purposes, so do not
                  enter sensitive information, create a password that is not
                  used in any application and feel free to enter a fictitious
                  email.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
