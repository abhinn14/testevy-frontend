import React from "react";

export default function AboutUs() {
  return (
    <main className="bg-black text-white">

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            About Testevy
          </h1>
          <p className="text-lg text-white/65 leading-relaxed">
            Testevy is an AI-powered hiring integrity platform built to solve one of the
            most expensive problems in modern recruiting, cheating.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid md:grid-cols-2 gap-20 items-start">

          <div className="space-y-6 max-w-xl">
            <h2 className="text-2xl font-semibold">
              Why we built Testevy
            </h2>

            <p className="text-white/65 leading-relaxed">
              Remote hiring unlocked access to global talent, but it also created a
              massive blind spot. Candidates could use external help, impersonators,
              or AI tools, and traditional assessments had no reliable way to tell.
            </p>

            <p className="text-white/60 leading-relaxed">
              We built Testevy to restore trust in hiring. Our system combines computer
              vision, behavioral analysis, and human review to ensure that companies
              hire people for what they actually know, not what they can fake.
            </p>
          </div>

          <div className="space-y-6 max-w-xl">
            <h2 className="text-2xl font-semibold">
              How we think about trust
            </h2>

            <p className="text-white/65 leading-relaxed">
              We do not believe in automated rejection without evidence. Every signal
              we generate is backed by data, context, and reviewable recordings.
            </p>

            <p className="text-white/60 leading-relaxed">
              Our goal is not to punish candidates, it is to protect honest people and
              give hiring teams the confidence to make the right decision.
            </p>
          </div>

        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="max-w-3xl space-y-12">
          <h2 className="text-3xl font-semibold">
            What we stand for
          </h2>

          <div className="space-y-8 text-white/70">
            <div>
              <p className="text-white font-semibold">Evidence over assumptions</p>
              <p className="mt-2">
                Every decision in Testevy is based on verifiable data, never guesswork.
              </p>
            </div>

            <div>
              <p className="text-white font-semibold">Fairness for candidates</p>
              <p className="mt-2">
                Honest candidates should never be punished by false positives or noisy systems.
              </p>
            </div>

            <div>
              <p className="text-white font-semibold">Security by design</p>
              <p className="mt-2">
                Hiring data is sensitive. We build Testevy with the same rigor as financial
                and identity platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
