"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";

type Step = "LOADING" | "EMAIL" | "QUESTIONS";

type Question = {
  id: string;
  order_index: number;
  marks: number;
  title: string;
  type: "MCQ" | "CODING" | "ESSAY";
  difficulty?: string;
  content: {
    question: string;
    options?: string[];
  };
  tags: string[];
};

const Test = () => {
  const { access_code } = useParams<{ access_code: string }>();

  const [step, setStep] = useState<Step>("LOADING");
  const [test, setTest] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // ---- Fetch test details ----
  useEffect(() => {
    if (!access_code) return;

    axios
      .get(
        `${process.env.NEXT_PUBLIC_ADMIN_SERVICE}/api/test/${access_code}/details`
      )
      .then((res) => {
        setTest(res.data.data);
        setStep("EMAIL");
      })
      .catch(() => {
        setError("Invalid or expired test link");
      });
  }, [access_code]);

  // ---- Verify email & fetch questions ----
  const verifyEmail = async () => {
    setError("");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_SERVICE}/api/test/${access_code}/candidate/verify`,
        { email }
      );

      setLoadingQuestions(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_SERVICE}/api/test/${access_code}/questions`,
        { params: { email } }
      );

      setQuestions(res.data.data.questions);
      setStep("QUESTIONS");
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoadingQuestions(false);
    }
  };

  return (
    <>
      {/* ================= HEADER (UNCHANGED) ================= */}
      <header className="sticky top-0 z-50 bg-black border-b border-white/10 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -bottom-10 inset-x-0 top-0
          bg-[radial-gradient(circle_at_25%_0%,rgba(56,189,248,0.12),transparent_65%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.10),transparent_65%)]"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Testevy"
                width={120}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* ================= PAGE BODY ================= */}
      <main className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.12),transparent_45%)]" />

        <section className="relative mx-auto max-w-7xl px-6 pt-28 pb-32">
          {step === "LOADING" && (
            <p className="text-white/60 text-lg">Loading test…</p>
          )}

          {step !== "LOADING" && test && (
            <div className="max-w-3xl space-y-10">
              {/* ---- Test Info ---- */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                  {test.title}
                </h1>

                {test.description && (
                  <p className="text-lg text-white/65">
                    {test.description}
                  </p>
                )}

                <div className="flex gap-6 text-sm text-white/60 pt-2">
                  <span>⏱ {test.total_time_minutes} minutes</span>
                  <span>📝 {test.total_questions} questions</span>
                </div>
              </div>

              {/* ---- EMAIL STEP ---- */}
              {step === "EMAIL" && (
                <div className="space-y-5 max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email to start the test"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full rounded-xl bg-neutral-950 border border-white/15
                      px-5 py-4 text-white placeholder:text-white/40
                      focus:outline-none focus:border-cyan-400
                    "
                  />

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    onClick={verifyEmail}
                    className="
                      cursor-pointer rounded-full
                      bg-gradient-to-r from-cyan-400 to-emerald-400
                      px-8 py-3 text-sm font-semibold text-black
                      shadow-[0_0_40px_rgba(56,189,248,0.45)]
                      hover:brightness-110 transition
                    "
                  >
                    Start Test
                  </button>
                </div>
              )}

              {/* ---- QUESTIONS STEP ---- */}
              {step === "QUESTIONS" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold">Questions</h2>

                  {loadingQuestions && (
                    <p className="text-white/60">Loading questions…</p>
                  )}

                  {!loadingQuestions &&
                    questions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="rounded-2xl border border-white/10 bg-neutral-950 p-6 space-y-4"
                      >
                        <div className="flex justify-between text-sm text-white/60">
                          <span>Question {idx + 1}</span>
                          <span>{q.marks} marks</span>
                        </div>

                        <p className="text-lg font-medium">
                          {q.content.question}
                        </p>

                        {/* MCQ */}
                        {q.type === "MCQ" && q.content.options && (
                          <div className="space-y-3 pt-2">
                            {q.content.options.map((opt, i) => (
                              <label
                                key={i}
                                className="flex items-center gap-3 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`q-${q.id}`}
                                  className="accent-cyan-400"
                                />
                                <span className="text-white/80">{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {/* CODING */}
                        {q.type === "CODING" && (
                          <textarea
                            placeholder="Write your code here..."
                            className="
                              w-full min-h-[220px] rounded-xl
                              bg-black border border-white/15
                              p-4 text-white font-mono text-sm
                              focus:outline-none focus:border-cyan-400
                            "
                          />
                        )}

                        {/* ESSAY */}
                        {q.type === "ESSAY" && (
                          <textarea
                            placeholder="Write your answer..."
                            className="
                              w-full min-h-[160px] rounded-xl
                              bg-black border border-white/15
                              p-4 text-white
                              focus:outline-none focus:border-cyan-400
                            "
                          />
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Test;
