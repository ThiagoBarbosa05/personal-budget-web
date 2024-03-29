import { cookies } from "next/headers";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Logout } from "../logout";
import { formatDate } from "@/utils/format-date";

async function getUser() {
  try {
    const token = cookies().get("next_token")?.value;
    const refreshToken = cookies().get("next_refreshToken")?.value;
    const response = await fetch(
      `${process.env.BASE_API_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
