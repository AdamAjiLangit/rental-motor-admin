'use client';

import { NextUIProvider, Button } from "@nextui-org/react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <NextUIProvider>
      <main>
        <Sidebar />
      </main>
    </NextUIProvider>
  );
}