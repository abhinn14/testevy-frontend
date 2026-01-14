import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">

      {/* Subtle glow to match site */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(56,189,248,0.08),transparent_60%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {/* Brand */}
          <div className="space-y-6">
            <Image
              src="/logo.png"
              alt="Testevy"
              width={120}
              height={48}
              className="object-contain"
            />
          </div>

          {/* Company */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-widest text-white/40">
              Company
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <Link href="/about-us" className="hover:text-white transition">
                About
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-widest text-white/40">
              Contact
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <a
                href="mailto:abhinn@testevy.tech"
                className="hover:text-white transition"
              >
                abhinn@testevy.tech
              </a>
              <span className="text-white/50">Delhi, India</span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Testevy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
