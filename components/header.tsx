import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./theme-toggle";
import { Navbar } from "./navbar";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Navbar />
        <div className="ml-auto flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[200px] lg:w-[300px]"
          />
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="@user" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
