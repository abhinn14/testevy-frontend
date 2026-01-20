"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavFoot = !pathname.startsWith("/test/");

  return (
    <>
      {showNavFoot && <Navbar />}
      {children}
      {showNavFoot && <Footer />}
    </>
  );
}