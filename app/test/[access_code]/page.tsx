"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAttempt } from "./hooks/useAttempt";
import { useTestAttemptStore } from "./store/testAttempt.store";

import { CandidateVerification } from "./components/CandidateVerification";
import { Instructions } from "./components/Instructions";
import { TestAttempt } from "./components/TestAttempt";
import { SubmissionSuccess } from "./components/SubmissionSuccess";
import { InvalidAttempt } from "./components/InvalidAttempt";

const TestPage = () => {
  const { access_code } = useParams<{ access_code: string }>();
  const { status, test } = useTestAttemptStore();

  // Initialize attempt and fetch test details
  useAttempt(access_code);

  // Render based on status
  switch (status) {
    case "LOADING":
      return (
        <div className="h-screen flex items-center justify-center bg-[#1a1a2e] text-white">
          <div className="flex items-center gap-3 text-white/60">
            <Loader2 className="animate-spin" size={24} />
            <span className="text-lg">Loading test…</span>
          </div>
        </div>
      );

    case "INVALID":
      return <InvalidAttempt />;

    case "VERIFICATION":
      return test ? <CandidateVerification test={test} /> : null;

    case "INSTRUCTIONS":
      return test ? <Instructions test={test} /> : null;

    case "IN_PROGRESS":
    case "SUBMITTING":
      return <TestAttempt />;

    case "SUBMITTED":
      return <SubmissionSuccess />;

    default:
      return <InvalidAttempt />;
  }
};

export default TestPage;
