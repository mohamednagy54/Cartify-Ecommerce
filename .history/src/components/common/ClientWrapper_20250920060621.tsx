"use client";

import { useAppContext } from "@/context/appContext";
import MainLoader from "./MainLoader";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { globalLoading } = useAppContext();

  if (globalLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <MainLoader />
      </div>
    );
  }

  return <>{children}</>;
}
