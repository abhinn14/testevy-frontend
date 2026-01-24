"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { useTestAttemptStore, Question } from "../store/testAttempt.store";

export const useStartTest = () => {
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  const {
    accessCode,
    token,
    test,
    setQuestions,
    initializeAnswers,
    startTimer,
    setStatus,
  } = useTestAttemptStore();

  const startTest = useCallback(async () => {
    if (!accessCode || !token) {
      setStartError("Session expired. Please refresh and try again.");
      return false;
    }

    setStartError(null);
    setIsStarting(true);

    try {
      // Start test and fetch questions
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_PROCTORING_SERVICE}/api/test/${accessCode}/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedQuestions: Question[] = res.data.data.questions;

      setQuestions(fetchedQuestions);
      initializeAnswers(fetchedQuestions);

      // Start timer
      if (test?.total_time_minutes) {
        startTimer(test.total_time_minutes);
      }

      setStatus("IN_PROGRESS");
      return true;
    } catch (err: any) {
      const message = err.response?.data?.message;
      if (message === "Test already submitted") {
        setStartError("You have already submitted this test.");
      } else if (message === "Invalid or expired token") {
        setStartError("Session expired. Please refresh and verify again.");
      } else {
        setStartError(message || "Failed to start test. Please try again.");
      }
      return false;
    } finally {
      setIsStarting(false);
    }
  }, [
    accessCode,
    token,
    test,
    setQuestions,
    initializeAnswers,
    startTimer,
    setStatus,
  ]);

  return {
    isStarting,
    startError,
    startTest,
  };
};
