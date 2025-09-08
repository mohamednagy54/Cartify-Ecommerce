"use client";

import { AppProvider } from "@/context/appContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider>
        {children}

        <Toaster richColors />
      </AppProvider>
    </SessionProvider>
  );
}
