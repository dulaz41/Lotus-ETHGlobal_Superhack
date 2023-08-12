"use client";
import { Footer, Hero, Navbar } from "@/components";
import Image from "next/image";
import React, { useState } from "react";

interface AccountData {
  addr: string;
  balance: number;
  // Add any other properties you expect from the result
}

export default function Home(): JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);

  return (
    <main className="overflow-hidden relative">
      <Navbar isConnected={isConnected} account={account} />
      <Hero isConnected={isConnected} />
      <Footer isConnected={isConnected} />
    </main>
  );
}
