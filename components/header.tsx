"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./theme-toggle";
import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";
import { SearchResults } from "@/components/search-results";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  if (pathname === "/") return null;

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Navbar />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
              </div>
            )}
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="@user" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
      </div>
      {searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onClose={() => setSearchResults([])}
        />
      )}
    </div>
  );
}
