"use client";

import { usePathname } from "next/navigation";
import PhaseNav from "@/components/shared/PhaseNav";

export default function MLLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/ml" && <PhaseNav />}
      {children}
    </>
  );
}
