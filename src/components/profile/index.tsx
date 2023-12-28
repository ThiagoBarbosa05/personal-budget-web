import { cookies } from "next/headers";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import dayjs from "dayjs";
import { Logout } from "../logout";

async function getUser() {
  try {
    const token = cookies().get("next_token")?.value;
    const response = await fetch(
      "https://personal-budget-api-3285.onrender.com/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(!response.ok) {
      throw new Error()
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function Profile({ children }: { children: React.ReactNode }) {

  const {user}  = await getUser();

  const createdAt = dayjs(user.created_at).format("D MMMM YYYY");

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
