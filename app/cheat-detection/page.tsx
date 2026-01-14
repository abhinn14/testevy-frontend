"use client";

export default function CheatDetection() {
  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Cheat Detection
          </h1>

          <p className="text-lg text-white/65 leading-relaxed">
            Testevy does not guess. Every decision is backed by visual, behavioral,
            and system-level evidence. Our goal is to protect honest candidates
            while reliably identifying real fraud.
          </p>
        </div>
      </section>

      {/* ACTION MODEL */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-white/15 bg-neutral-950 p-10 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">
            Action model
          </h2>

          <div className="space-y-4 text-white/70">
            <p>
              Each candidate receives a <span className="text-white font-medium">suspicion score</span> based on
              all collected signals. We never auto-reject without evidence.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-6 text-sm">
              <div className="border border-white/10 rounded-lg p-5">
                <p className="font-semibold text-white">Low risk</p>
                <p className="mt-2 text-white/60">Test accepted normally</p>
              </div>
              <div className="border border-white/10 rounded-lg p-5">
                <p className="font-semibold text-white">Medium risk</p>
                <p className="mt-2 text-white/60">Flagged for human review</p>
              </div>
              <div className="border border-white/10 rounded-lg p-5">
                <p className="font-semibold text-white">High risk</p>
                <p className="mt-2 text-white/60">Confirmed cheating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNALS */}
      <section className="mx-auto max-w-7xl px-6 pb-32 space-y-24">

        {/* Visual */}
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6 max-w-xl">
            <h3 className="text-2xl font-semibold">1. Visual signals</h3>
            <p className="text-white/65 leading-relaxed">
              Multiple cameras and AI vision models analyze a candidate’s physical
              behavior to detect impersonation, device usage, and off-screen assistance.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-white/70">
            {[
              "Multiple person detection",
              "Face absence or prolonged occlusion",
              "Identity consistency checks",
              "Suspicious object detection",
              "Dual side-camera monitoring to remove blind spots",
              "Abnormal gaze persistence away from test screen",
              "Repeated micro-glances to consistent off-screen locations",
              "Head-eye mismatch detection",
              "Cross-view contradiction detection between cameras"
            ].map(item => (
              <li key={item} className="border-b border-white/10 pb-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Typing */}
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6 max-w-xl">
            <h3 className="text-2xl font-semibold">2. Typing signals</h3>
            <p className="text-white/65 leading-relaxed">
              Human problem solving leaves behavioral fingerprints. We analyze
              typing dynamics to detect external assistance or automation.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-white/70">
            {[
              "Keystroke rhythm analysis for unnatural typing bursts",
              "Inactivity-to-completion jumps",
              "Copy-like behavior without clipboard usage"
            ].map(item => (
              <li key={item} className="border-b border-white/10 pb-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* System */}
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6 max-w-xl">
            <h3 className="text-2xl font-semibold">3. Browser & system signals</h3>
            <p className="text-white/65 leading-relaxed">
              We monitor how candidates interact with their device to detect
              hidden browsing, tool usage, or screen manipulation.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-white/70">
            {[
              "Tab switching and focus loss detection",
              "Browser change events",
              "Split-screen and multi-window usage",
              "Fullscreen enforcement violations",
              "Developer tools and console access",
              "Abnormal refresh, navigation, and URL changes",
              "Cross-signal correlation with gaze and typing"
            ].map(item => (
              <li key={item} className="border-b border-white/10 pb-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

      </section>

    </main>
  );
}
