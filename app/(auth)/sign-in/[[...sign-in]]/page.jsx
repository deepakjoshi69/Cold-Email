"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-inherit flex mt-8">
      
      <div className="w-1/2 h-full flex items-center justify-center bg-gray-50">
        <Image
          src="/Image/Lady-With-Table.png"
          alt="Login Illustration"
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>

      <div className="w-1/2 h-full flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md',
              },
              variables: {
                colorPrimary: '#2563eb',
                borderRadius: '0.5rem',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
