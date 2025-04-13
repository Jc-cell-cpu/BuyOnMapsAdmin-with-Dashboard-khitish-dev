import { Metadata } from "next";
import React from "react";
import Auth from "@/components/Verifiy";

export const metadata: Metadata = {
  title:
    "BuyOnMaps",
  description: "This is BuyOnMaps Dashboard page",
};

export default function Home() {
  return (
    <>
      {/* <Dashboard /> */}
      <Auth />
    </>
  );
}
