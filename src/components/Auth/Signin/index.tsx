"use client";
import Link from "next/link";
import React from "react";
import SigninWithPassword from "../SigninWithPassword";
import Image from "next/image";

export default function Signin() {
  return (
    <>
      <div className="flex items-center justify-center">
        <Image
          src={"/images/logo/logo.svg"}
          alt="Logo"
          width={200}
          height={180}
        />
      </div>
      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don&apos;t have any account?{" "}
          <Link href="/auth/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
