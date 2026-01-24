"use client";

import { useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useTestAttemptStore } from "../store/testAttempt.store";

const HEARTBEAT_INTERVAL = 30000; // 30 seconds
const TIME_SYNC_INTERVAL = 60000; // 60 seconds - sync with backend

export const useHeartbeat = () => {
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeSyncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    status,
    accessCode,
    candidateEmail,
    attemptId,
    token,
    timeLeftSeconds,
    decrementTime,
    setTimeLeft,
    setStatus,
  } = useTestAttemptStore();

  const getAuthHeaders = useCallback(() => ({
    Authorization: `Bearer ${token}`,
  }), [token]);

  // Sync time with backend (backend is the authority)
  const syncTimeWithBackend = useCallback(async () => {
    if (!accessCode || !token) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PROCTORING_SERVICE}/api/test/${accessCode}/time`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        const { remainingSeconds, expired } = response.data.data;
        
        // Update local time with server's authoritative time
        setTimeLeft(remainingSeconds);

        // If server says time is expired, trigger auto-submit
        if (expired) {
          setStatus("SUBMITTED");
        }
      }
    } catch (err) {
      console.error("Time sync failed:", err);
      // Continue with local countdown if sync fails
    }
  }, [accessCode, token, getAuthHeaders, setTimeLeft, setStatus]);

  const sendHeartbeat = useCallback(async () => {
    if (!accessCode || !candidateEmail || !attemptId || !token) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PROCTORING_SERVICE}/api/test/${accessCode}/heartbeat`,
        {
          email: candidateEmail,
          attemptId,
          timeRemaining: timeLeftSeconds,
          timestamp: new Date().toISOString(),
        },
        { headers: getAuthHeaders() }
      );
    } catch (err) {
      console.error("Heartbeat failed:", err);
    }
  }, [accessCode, candidateEmail, attemptId, token, timeLeftSeconds, getAuthHeaders]);

  // Timer countdown (local, runs every second)
  useEffect(() => {
    if (status !== "IN_PROGRESS") return;

    const timerInterval = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [status, decrementTime]);

  // Time sync with backend (every 60 seconds)
  useEffect(() => {
    if (status !== "IN_PROGRESS") {
      if (timeSyncIntervalRef.current) {
        clearInterval(timeSyncIntervalRef.current);
        timeSyncIntervalRef.current = null;
      }
      return;
    }

    // Initial sync
    syncTimeWithBackend();

    // Set up interval for periodic sync
    timeSyncIntervalRef.current = setInterval(syncTimeWithBackend, TIME_SYNC_INTERVAL);

    return () => {
      if (timeSyncIntervalRef.current) {
        clearInterval(timeSyncIntervalRef.current);
        timeSyncIntervalRef.current = null;
      }
    };
  }, [status, syncTimeWithBackend]);

  // Heartbeat for proctoring
  useEffect(() => {
    if (status !== "IN_PROGRESS") {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = null;
      }
      return;
    }

    // Send initial heartbeat
    sendHeartbeat();

    // Set up interval
    heartbeatIntervalRef.current = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = null;
      }
    };
  }, [status, sendHeartbeat]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (status === "IN_PROGRESS" && timeLeftSeconds === 0) {
      // Trigger auto-submit
      console.log("Time is up! Auto-submitting...");
      // The parent component should handle this by watching timeLeftSeconds
    }
  }, [status, timeLeftSeconds]);

  return {
    timeLeftSeconds,
    sendHeartbeat,
    syncTimeWithBackend,
  };
};
