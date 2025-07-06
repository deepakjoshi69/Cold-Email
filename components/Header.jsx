"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Mail, Menu, X } from "lucide-react";
import { toast } from "sonner";

export default function Header() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hideAuthButtons = pathname === "/sign-in" || pathname === "/sign-up";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-white/90 backdrop-blur-lg shadow-md"
            : "py-4 bg-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left: Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-5 w-5 text-gray-800" />
            </button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">MailMind</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {isSignedIn ? (
              <>
                <NavLink href="/dashboard" active={pathname === "/dashboard"}>
                  Dashboard
                </NavLink>
                <NavLink
                  href="#"
                  onClick={() => toast.error("Profile page is not available")}
                >
                  Profile
                </NavLink>
                <NavLink
                  href="#"
                  onClick={() => toast.error("About page is not available")}
                >
                  About
                </NavLink>
                <div className="ml-6">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: { userButtonAvatarBox: "w-9 h-9" },
                    }}
                  />
                </div>
              </>
            ) : !hideAuthButtons ? (
              <>
                <NavLink href="/sign-in" active={pathname === "/sign-in"}>
                  Login
                </NavLink>
                <Link href="/sign-up" className="ml-2">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2 rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">MailMind</span>
            </Link>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5 text-gray-800" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex flex-col space-y-3">
            {isSignedIn ? (
              <>
                <MobileNavLink
                  href="/dashboard"
                  active={pathname === "/dashboard"}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </MobileNavLink>
                <MobileNavLink
                  href="#"
                  onClick={() => {
                    setIsOpen(false);
                    toast.error("Profile page is not available");
                  }}
                >
                  Profile
                </MobileNavLink>
                <MobileNavLink
                  href="#"
                  onClick={() => {
                    setIsOpen(false);
                    toast.error("About page is not available");
                  }}
                >
                  About
                </MobileNavLink>
                <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-4">
                  <span className="text-gray-500">Account</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : !hideAuthButtons ? (
              <>
                <MobileNavLink
                  href="/sign-in"
                  active={pathname === "/sign-in"}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </MobileNavLink>
                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-4"
                >
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg font-medium">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : null}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MailMind
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Desktop NavLink Component
function NavLink({ href, children, active, className = "", onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`px-4 py-2 text-gray-700 rounded-lg transition-all font-medium ${
        active
          ? "bg-purple-100 text-purple-700"
          : "hover:bg-gray-100 hover:text-purple-600"
      } ${className}`}
    >
      {children}
    </a>
  );
}

// Mobile NavLink Component
function MobileNavLink({ href, children, active, className = "", onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`px-4 py-3 rounded-lg transition-all font-medium ${
        active
          ? "bg-purple-100 text-purple-700"
          : "text-gray-700 hover:bg-gray-50 hover:text-purple-600"
      } ${className}`}
    >
      {children}
    </a>
  );
}
