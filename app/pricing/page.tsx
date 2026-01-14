"use client";
import React from "react";

export default function Pricing() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight">
            Find the right solution and get pricing
          </h1>
          <p className="mt-4 text-white/60">
            Choose a plan and tell us about your hiring needs. We'll get you set up with the right level of protection.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Standard Plan */}
          <div className="rounded-2xl border border-white/15 bg-neutral-950 p-8 hover:border-cyan-400/40 transition">
            <h3 className="text-xl font-semibold mb-2">Standard</h3>
            <p className="text-3xl font-bold text-cyan-400">₹2,999</p>
            <p className="text-sm text-white/50 mb-6">per month</p>

            <ul className="space-y-3 text-sm text-white/70">
              <li>• Advanced plagiarism detection</li>
              <li>• 80 attempts per month</li>
              <li>• ₹50 per additional attempt</li>
              <li>• AI camera cheat detection</li>
            </ul>
          </div>

          {/* Advanced Plan */}
          <div className="rounded-2xl border border-cyan-400 bg-neutral-950 p-8 shadow-[0_0_40px_rgba(56,189,248,0.25)]">
            <h3 className="text-xl font-semibold mb-2">Advanced</h3>
            <p className="text-3xl font-bold text-cyan-400">₹3,999</p>
            <p className="text-sm text-white/50 mb-6">per month</p>

            <ul className="space-y-3 text-sm text-white/70">
              <li>• Everything in Standard</li>
              <li>• Multi-angle camera detection</li>
              <li>• Advanced impersonation detection</li>
              <li>• Higher fraud-risk accuracy</li>
            </ul>
          </div>

          {/* Lead Form */}
          <div className="rounded-2xl border border-white/15 bg-neutral-950 p-8">
            <h3 className="text-xl font-semibold mb-6">
              Find the right solution
            </h3>

            <form
              action="https://formspree.io/f/xjggvwyz"
              method="POST"
              className="space-y-5">
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Work Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="example@company.com"
                  className="w-full rounded-lg bg-black border border-white/15 px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  required
                  className="w-full rounded-lg bg-black border border-white/15 px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="">Select...</option>
                  <option>Talent Acquisition / Recruiting</option>
                  <option>Engineer</option>
                  <option>Recruiting Ops</option>
                  <option>IO or Organizational Development</option>
                  <option>University Representative</option>
                  <option>Student / Intern</option>
                  <option>Candidate / Developer / Individual User</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Which plan?
                </label>
                <select
                  name="plan"
                  required
                  className="w-full rounded-lg bg-black border border-white/15 px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option>Standard – ₹2,999</option>
                  <option>Advanced – ₹3,999</option>
                </select>
              </div>

              <button
                type="submit"
                className="cursor-pointer mt-4 w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:brightness-110 transition">
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
