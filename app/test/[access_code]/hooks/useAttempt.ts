"use client";

import { useEffect } from "react";
import axios from "axios";
import { useTestAttemptStore } from "../store/testAttempt.store";

export const useAttempt = (accessCode: string) => {
  const {
    status,
    test,
    errorMessage,
    setStatus,
    setError,
    setAccessCode,
    setTest,
  } = useTestAttemptStore();

  useEffect(() => {
    if(!accessCode) return;
    setAccessCode(accessCode);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_PROCTORING_SERVICE}/api/test/${accessCode}/details`
      )
      .then((res) => {
        setTest(res.data.data);
        setStatus("VERIFICATION");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Invalid or expired test link");
      });
  }, [accessCode, setAccessCode, setError, setStatus, setTest]);

  return {
    status,
    test,
    errorMessage,
    isLoading: status === "LOADING",
    isInvalid: status === "INVALID",
  };
};
