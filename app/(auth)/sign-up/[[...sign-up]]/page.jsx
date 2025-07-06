"use client";
import {SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LoginPage() {
  const pathname = usePathname();

  const isSignUpPage = pathname === "/sign-up";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      
      <div
        className={`
          ${isSignUpPage ? 'hidden lg:flex' : 'flex'}
          flex-1 items-center justify-center bg-gray-100
        `}
      >
        <div className="relative w-full h-64 lg:h-full">
          <Image
            src="/Image/Lady-With-Table.png"
            alt="Login Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Sign In section */}
      <div className="flex-1 flex items-center justify-center pt-8 sm:p-10 bg-gray-50">
        <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6 sm:p-8">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md",
              },
              variables: {
                colorPrimary: "#2563eb",
                borderRadius: "0.5rem",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
