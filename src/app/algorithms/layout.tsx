"use client";

import { usePathname } from "next/navigation";
import PhaseNav from "@/components/shared/PhaseNav";

export default function AlgorithmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/algorithms" && <PhaseNav />}
      {children}
    </>
  );
}
