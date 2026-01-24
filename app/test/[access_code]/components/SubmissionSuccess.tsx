"use client";

import { CheckCircle, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTestAttemptStore } from "../store/testAttempt.store";

export const SubmissionSuccess = () => {
  const { test, candidateEmail } = useTestAttemptStore();

  return (
    <div className="h-screen flex flex-col bg-[#1a1a2e] text-white">
      {/* Header */}
      <header className="flex-none h-14 bg-[#0f0f1a] border-b border-white/10 flex items-center px-4">
        <Image
          src="/logo.png"
          alt="Testevy"
          width={100}
          height={40}
          className="object-contain"
          priority
        />
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle size={48} className="text-green-400" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-green-400">
              Test Submitted Successfully!
            </h1>
            <p className="text-white/70">
              Thank you for completing the test. Your answers have been recorded.
            </p>
          </div>

          {/* Test Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-white/50">Test</span>
              <span className="font-medium">{test?.title || "Assessment"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Email</span>
              <span className="font-medium">{candidateEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Submitted At</span>
              <span className="font-medium">
                {new Date().toLocaleString()}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-left">
            <h3 className="font-semibold text-cyan-400 mb-2">What&apos;s Next?</h3>
            <p className="text-sm text-white/70">
              The hiring team will review your submission and get back to you
              shortly. Please check your email for updates.
            </p>
          </div>

          {/* Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white/80 hover:text-white transition-colors"
          >
            <Home size={18} />
            Go to Home
          </Link>
        </div>
      </main>
    </div>
  );
};
