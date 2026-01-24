"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { useVerification } from "../hooks/useVerification";
import { TestDetails } from "../store/testAttempt.store";

interface CandidateVerificationProps {
  test: TestDetails;
}

export const CandidateVerification = ({ test }: CandidateVerificationProps) => {
  const { email, setEmail, isVerifying, verificationError, verifyEmail } =
    useVerification();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      verifyEmail();
    }
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl">
          {/* Hero Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(129,140,248,0.12),transparent_50%)]" />

            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left: Test Details */}
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Assessment Ready
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                    {test.title}
                  </h1>
                  {test.description && (
                    <p className="text-white/60 leading-relaxed">
                      {test.description}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <Clock size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{test.total_time_minutes}</p>
                      <p className="text-xs text-white/50">Minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <FileText size={20} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{test.total_questions}</p>
                      <p className="text-xs text-white/50">Questions</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span>Auto-save enabled for all answers</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span>Navigate freely between questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span>Real-time code execution for coding questions</span>
                  </div>
                </div>
              </div>

              {/* Right: Email Form */}
              <div className="flex flex-col justify-center">
                <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center mb-4">
                      <Mail size={24} className="text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-semibold">Verify Your Email</h2>
                    <p className="text-sm text-white/50">
                      Enter the email address you registered with
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full rounded-xl bg-white/5 border border-white/10 pl-12 pr-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                        disabled={isVerifying}
                      />
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                      />
                    </div>

                    {verificationError && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 text-sm">{verificationError}</span>
                      </div>
                    )}

                    <button
                      onClick={verifyEmail}
                      disabled={isVerifying}
                      className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2 group"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-center text-white/40">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="text-cyan-400 hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-cyan-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/40">
              Having trouble?{" "}
              <a
                href="mailto:support@testevy.tech"
                className="text-cyan-400 hover:underline"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
