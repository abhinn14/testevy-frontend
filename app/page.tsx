import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative bg-black text-white overflow-hidden">

      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.12),transparent_45%)]" />

      <section className="relative mx-auto max-w-7xl px-6 pt-36 pb-32">
        <div className="max-w-4xl space-y-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
            Hire honest and skilled talent.<br />
            Not people who cheat.
          </h1>

          <p className="text-lg md:text-xl text-white/65 max-w-2xl">
            Testevy verifies real skill using AI-powered proctoring, multi-angle monitoring,
            and human review, so you hire with confidence.
          </p>

          <div className="flex flex-wrap gap-5 pt-2">
            <Link
              href="/pricing"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-8 py-3 text-sm font-semibold text-black shadow-[0_0_40px_rgba(56,189,248,0.45)] hover:brightness-110 transition"
            >
              See Pricing
            </Link>

            <Link
              href="/demo"
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white/90 hover:bg-white/5 transition"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}

      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <div className="space-y-8 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Why companies trust Testevy
            </h2>

            <p className="text-white/65 text-lg leading-relaxed">
              Hiring is a risk decision. One bad hire costs months of lost productivity,
              compromised data, and broken teams. Testevy exists to remove that risk.
            </p>

            <p className="text-white/60 leading-relaxed">
              Every candidate session is recorded, analyzed, and verified using a
              combination of AI systems and trained human reviewers. We don’t just
              detect cheating, we provide evidence that hiring teams can rely on.
            </p>

            {/* Secondary CTA */}
            <Link
              href="/cheat-detection"
              className="
                inline-flex items-center gap-2 text-sm font-semibold
                text-cyan-400 hover:text-cyan-300 transition
              "
            >
              See how we detect cheaters
              <span className="text-cyan-400">→</span>
            </Link>
          </div>

          {/* Right */}
          <div className="space-y-6 text-sm text-white/70">
            {[
              "Every test is monitored across camera, screen, and behavior signals",
              "AI flags suspicious activity in real time",
              "Human reviewers verify all high-risk cases",
              "Audit logs and recordings are stored for compliance",
              "Hiring teams get a clear risk score for every candidate",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-none"
              >
                <div className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                <p className="leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          
        </div>
      </section>



      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-950 p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.14),transparent_45%)]" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-xl space-y-4">
              <h3 className="text-3xl font-semibold">
                Ready to stop hiring cheaters?
              </h3>
              <p className="text-white/65 leading-relaxed">
                We’ll map your hiring flow, show real detection results, and get you live
                in under two weeks.
              </p>
            </div>

            <Link
              href="/pricing"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-8 py-3 font-semibold text-black shadow-[0_0_40px_rgba(56,189,248,0.45)] hover:brightness-110 transition"
            >
              Start Hiring with Testevy
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
