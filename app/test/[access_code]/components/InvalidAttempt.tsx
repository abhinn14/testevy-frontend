"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTestAttemptStore } from "../store/testAttempt.store";

export const InvalidAttempt = () => {
  const { errorMessage, reset } = useTestAttemptStore();

  const handleRetry = () => {
    reset();
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-black border-b border-white/10 relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
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
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle size={48} className="text-red-400" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-red-400">
              Unable to Access Test
            </h1>
            <p className="text-white/70">
              {errorMessage || "Something went wrong. Please try again."}
            </p>
          </div>

          {/* Common Reasons */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
            <h3 className="font-semibold mb-4">Common Reasons:</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-white/40">•</span>
                The test link has expired
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/40">•</span>
                You&apos;ve already completed this test
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/40">•</span>
                The test has been cancelled or modified
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/40">•</span>
                You&apos;re not registered for this test
              </li>
            </ul>
          </div>

          {/* Actions */}
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30 rounded-xl transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          {/* Support */}
          <p className="text-sm text-white/50">
            If you believe this is an error, please contact the test
            administrator or email{" "}
            <a
              href="mailto:support@testevy.tech"
              className="text-cyan-400 hover:underline"
            >
              support@testevy.tech
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

