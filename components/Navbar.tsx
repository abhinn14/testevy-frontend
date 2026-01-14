"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

const links = [
  { href: "/pricing", label: "PRICING" },
  { href: "/cheat-detection", label: "CHEAT DETECTION" },
  { href: "/about-us", label: "ABOUT US" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const currentPath = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    return pathname.replace(/\/$/, "");
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/10 relative">
      {/* Subtle glow to match hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Testevy"
              width={120}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center text-xs font-semibold tracking-wider text-white/60">
            {links.map((link, i) => {
              const isActive = currentPath === link.href;

              return (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    className={`group relative px-4 py-1 transition ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}

                    {/* underline */}
                    <span
                      className={`
                        absolute left-4 right-4 -bottom-2 h-[2px]
                        bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400
                        transition-transform duration-300 ease-out
                        ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                      `}
                    />
                  </Link>

                  {i !== links.length - 1 && (
                    <span className="text-white/20 select-none">|</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className={`h-[2px] w-5 bg-white transition ${open && "rotate-45 translate-y-[6px]"}`} />
            <span className={`h-[2px] w-5 bg-white transition ${open && "opacity-0"}`} />
            <span className={`h-[2px] w-5 bg-white transition ${open && "-rotate-45 -translate-y-[6px]"}`} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col p-6 gap-6 text-sm font-semibold tracking-wider text-white">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
