"use client";

import { useAppContext } from "@/context/appContext";
import MainLoader from "./MainLoader";
import { usePathname } from "next/navigation";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { globalLoading } = useAppContext();
  const pathname = usePathname();

  if (globalLoading && pathname !== "/profile") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <MainLoader />
      </div>
    );
  }

  return <>{children}</>;
}
