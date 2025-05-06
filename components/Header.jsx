import React from "react";
import { ModeToggle } from "./DarkButton";
import Link from "next/link";
import { BookMarkedIcon, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-2 py-2 md:px-6 flex items-center justify-between">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* left */}
        <div className="flex h-11 items-center gap-4">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-90"
          >
            <BookOpen className="h-5.5 w-5.5 text-primary" />
            <span>PoraShuna</span>
          </Link>

          {/* searchInput */}
          <SearchInput />
        </div>

        {/* right */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <nav>
            <SignedIn>
              <Link
                href="/my-courses"
                className="flex items-center space-x-2 hover:text-foreground hover:opacity-90 text-sm font-sm transition-colors md:border md:border-border rounded-md px-2 py-1"
              >
                <BookMarkedIcon className="h-4 w-4" />
                <span className="hidden md:block">My Courses</span>
              </Link>
            </SignedIn>
          </nav>
          <ModeToggle />

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
