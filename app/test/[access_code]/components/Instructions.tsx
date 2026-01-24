"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Play,
  Shield,
} from "lucide-react";
import { useStartTest } from "../hooks/useStartTest";
import { TestDetails } from "../store/testAttempt.store";

interface InstructionsProps {
  test: TestDetails;
}

const DEFAULT_INSTRUCTIONS = [
  "Read each question carefully before answering",
  "You can navigate between questions using the question numbers in the header",
  "Your answers are auto-saved as you progress",
  "For coding questions, make sure to run your code before submitting",
  "Once you submit the test, you cannot make any changes",
  "Do not refresh the page or close the browser during the test",
  "Ensure a stable internet connection throughout the test",
];

export const Instructions = ({ test }: InstructionsProps) => {
  const { isStarting, startError, startTest } = useStartTest();

  const instructions = test.instructions?.length
    ? test.instructions
    : DEFAULT_INSTRUCTIONS;

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
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Shield size={16} className="text-cyan-400" />
              <span>Secure Assessment</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium">
              <AlertTriangle size={14} />
              Read Before Starting
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Test Instructions</h1>
            <p className="text-white/60">
              Please read the following instructions carefully before starting
            </p>
          </div>

          {/* Test Info Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.10),transparent_50%)]" />
            <div className="relative p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{test.title}</h2>
                {test.description && (
                  <p className="text-sm text-white/50 mt-1">{test.description}</p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Clock size={18} className="text-cyan-400" />
                  <span className="text-sm font-medium">{test.total_time_minutes} min</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <FileText size={18} className="text-indigo-400" />
                  <span className="text-sm font-medium">{test.total_questions} questions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions List */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle size={20} className="text-green-400" />
              Important Guidelines
            </h3>
            <ul className="space-y-3">
              {instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-cyan-400">{index + 1}</span>
                  </div>
                  <span className="text-white/80">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warning */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-red-400 font-semibold">Important Notice</p>
              <p className="text-white/70 mt-1 text-sm">
                The timer will start immediately once you begin the test. Make sure
                you have enough time to complete all questions without interruption.
              </p>
            </div>
          </div>

          {/* Error */}
          {startError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{startError}</p>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={startTest}
            disabled={isStarting}
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-3 group"
          >
            {isStarting ? (
              <>
                <Loader2 className="animate-spin" size={22} />
                Loading Test...
              </>
            ) : (
              <>
                <Play size={22} className="group-hover:scale-110 transition-transform" />
                Start Test Now
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-white/40">
            Need help?{" "}
            <a href="mailto:support@testevy.tech" className="text-cyan-400 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};
