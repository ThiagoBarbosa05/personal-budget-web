import { cookies } from "next/headers";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import dayjs from "dayjs";
import { Logout } from "../logout";
import { formatDate } from "@/utils/format-date";

async function getUser() {
  try {
    const token = cookies().get("next_token")?.value;
    const refreshToken = cookies().get("next_refreshToken")?.value;
    const response = await fetch(
      "https://personal-budget-api-3285.onrender.com/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(!response.ok) {
      // const response = await fetch(
      //   "https://personal-budget-api-3285.onrender.com/refresh-token",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({refreshToken}),
      //   }
      // );
      // const newToken = await response.json();
      // cookies().set('next_token', newToken.accessToken)
      throw new Error()
    }

   return response.json(); 
  } catch (err) {
    console.log(err);
  }
}

export async function Profile({ children }: { children: React.ReactNode }) {

  const {user}  = await getUser();

  const createdAt = formatDate({date: user.created_at})

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex flex-col items-start gap-4" align="end">
        <div>
          <span className="block mb-1 font-bold">{user.username}</span>
          <span className="text-sm text-zinc-400">{createdAt}</span>
        </div>
        <Logout />
      </PopoverContent>
    </Popover>
  );
}
