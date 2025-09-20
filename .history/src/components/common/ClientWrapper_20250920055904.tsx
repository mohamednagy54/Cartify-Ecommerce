"use client";

import { useAppContext } from "@/context/appContext";
import MainLoader from "./MainLoader";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { globalLoading } = useAppContext();

  if (globalLoading) {
    return <MainLoader />;
  }

  return <>{children}</>;
}
