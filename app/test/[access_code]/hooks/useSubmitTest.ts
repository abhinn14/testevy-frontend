"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { useTestAttemptStore } from "../store/testAttempt.store";

export const useSubmitTest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    accessCode,
    candidateEmail,
    attemptId,
    token,
    answers,
    setStatus,
  } = useTestAttemptStore();

  const getAuthHeaders = useCallback(() => ({
    Authorization: `Bearer ${token}`,
  }), [token]);

  const submitAnswer = useCallback(
    async (questionId: string) => {
      const answer = answers.find((a) => a.questionId === questionId);
      if (!answer) return false;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_PROCTORING_SERVICE}/api/test/${accessCode}/answer`,
          {
            email: candidateEmail,
            attemptId,
            questionId,
            answer:
              answer.type === "MCQ"
                ? { type: "MCQ", selectedOption: answer.mcqAnswer }
                : {
                    type: "CODING",
                    language: answer.codeAnswer?.language,
                    code: answer.codeAnswer?.code,
                  },
          },
          { headers: getAuthHeaders() }
        );
        return true;
      } catch (err) {
        console.error("Failed to submit answer:", err);
        return false;
      }
    },
    [accessCode, candidateEmail, attemptId, answers, getAuthHeaders]
  );

  const submitTest = useCallback(async () => {
    if (!accessCode || !candidateEmail) {
      setSubmitError("Missing required information");
      return false;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    setStatus("SUBMITTING");

    try {
      // Submit all answers
      const submitPromises = answers.map((answer) =>
        submitAnswer(answer.questionId)
      );
      await Promise.all(submitPromises);

      // Finalize submission
      await axios.post(
        `${process.env.NEXT_PUBLIC_PROCTORING_SERVICE}/api/test/${accessCode}/submit`,
        {
          email: candidateEmail,
          attemptId,
        },
        { headers: getAuthHeaders() }
      );

      setStatus("SUBMITTED");
      return true;
    } catch (err: any) {
      setSubmitError(
        err.response?.data?.message || "Failed to submit test. Please try again."
      );
      setStatus("IN_PROGRESS");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [accessCode, candidateEmail, attemptId, answers, submitAnswer, setStatus, getAuthHeaders]);

  return {
    isSubmitting,
    submitError,
    submitAnswer,
    submitTest,
  };
};
