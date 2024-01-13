"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="">
        <div className="w-full min-h-screen px-6 flex flex-col justify-center items-center">
          <Card className="w-full">
            <CardHeader>
              <h2>Something went wrong!</h2>
            </CardHeader>
            <CardContent>
              <Button onClick={() => reset()}>Try again</Button>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}
