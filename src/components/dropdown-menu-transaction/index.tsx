import { PencilSimpleLine, Trash } from "@phosphor-icons/react/dist/ssr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteTransactionAlert from "../delete-transaction";
import { Button } from "../ui/button";

export function DropdownMenuTransaction({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2">
            <PencilSimpleLine size={16} weight="bold" />
            <span>edit</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-2">
            <DeleteTransactionAlert>
              <Button>
                <Trash size={16} weight="bold" />
                <span>delete</span>
              </Button>
            </DeleteTransactionAlert>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
