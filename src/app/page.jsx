'use client';

import { NextUIProvider, Button } from "@nextui-org/react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  if (typeof window !== 'undefined') {
    console.log("Window Test");
  };

  return (
    <NextUIProvider>
      <main>
        <Sidebar />
      </main>
    </NextUIProvider>
  );
}