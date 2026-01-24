"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { useTestAttemptStore } from "../store/testAttempt.store";

export const useVerification = () => {
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const { accessCode, setCandidateEmail, setAttemptId, setToken, setStatus } = useTestAttemptStore();

  const verifyEmail = useCallback(async () => {
    if (!email.trim()) {
      setVerificationError("Please enter your email");
      return false;
    }

    if (!accessCode) {
      setVerificationError("Invalid test access code");
      return false;
    }

    setVerificationError(null);
    setIsVerifying(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_PROCTORING_SERVICE}/api/test/${accessCode}/candidate/verify`,
        { email }
      );

      const { token, attempt_id } = res.data.data;

      setCandidateEmail(email);
      setToken(token);
      setAttemptId(attempt_id);
      setStatus("INSTRUCTIONS");
      return true;
    } catch (err: any) {
      setVerificationError(
        err.response?.data?.message || "Email verification failed. Please check if you're registered for this test."
      );
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [email, accessCode, setCandidateEmail, setAttemptId, setToken, setStatus]);

  return {
    email,
    setEmail,
    isVerifying,
    verificationError,
    verifyEmail,
  };
};
