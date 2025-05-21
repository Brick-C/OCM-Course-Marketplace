"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BookMarkedIcon, BookOpen } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import "./styles/header.css";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-left-section">
          <Link href="/" prefetch={false} className="logo-link">
            <BookOpen className="logo-icon" />
            <span className="logo-text">Ewudemy</span>
          </Link>

          <div className="search-input-wrapper">
            <SearchInput />
          </div>
        </div>

        <div className="header-right-section">
          <nav className="main-nav">
            <Link
              prefetch={false}
              href="/my-courses"
              className="my-courses-link"
            >
              <BookMarkedIcon className="my-courses-icon" />
              <span className="my-courses-text">My Courses</span>
            </Link>
          </nav>

          <DarkModeToggle />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="default"
                className="sign-in-button"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
