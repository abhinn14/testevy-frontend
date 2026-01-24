import { create } from "zustand";
import type { SupportedLanguage } from "@/store/useCodeEditorStore";

// ============ TYPES ============

export type AttemptStatus =
  | "LOADING"
  | "INVALID"
  | "VERIFICATION"
  | "INSTRUCTIONS"
  | "IN_PROGRESS"
  | "SUBMITTING"
  | "SUBMITTED";

export type CodeTemplate = {
  language: SupportedLanguage;
  template: string;
};

export type Question = {
  id: string;
  order_index: number;
  marks: number;
  title: string;
  type: "MCQ" | "CODING";
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  content: {
    question: string;
    options?: string[];
    codeTemplates?: CodeTemplate[];
    ioMode?: "STDIN" | "FUNCTION";
  };
  execution?: {
    constraints: {
      timeLimitMs: number;
      memoryLimitMb: number;
    };
    testCases: {
      input: string;
      expectedOutput: string;
      isHidden?: boolean;
    }[];
  };
  tags: string[];
};

export type Answer = {
  questionId: string;
  type: "MCQ" | "CODING";
  mcqAnswer?: number;
  codeAnswer?: {
    language: SupportedLanguage;
    code: string;
  };
};

export type TestDetails = {
  id: string;
  title: string;
  description?: string;
  total_time_minutes: number;
  total_questions: number;
  instructions?: string[];
};

// ============ STORE STATE ============

interface TestAttemptState {
  // Status
  status: AttemptStatus;
  errorMessage: string | null;

  // Test info
  accessCode: string | null;
  test: TestDetails | null;
  candidateEmail: string | null;
  attemptId: string | null;
  token: string | null;

  // Questions & Answers
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;

  // Timer
  timeLeftSeconds: number;
  startedAt: Date | null;

  // Actions
  setStatus: (status: AttemptStatus) => void;
  setError: (message: string | null) => void;
  setAccessCode: (code: string) => void;
  setTest: (test: TestDetails) => void;
  setCandidateEmail: (email: string) => void;
  setAttemptId: (id: string) => void;
  setToken: (token: string) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setTimeLeft: (seconds: number) => void;
  decrementTime: () => void;
  startTimer: (totalMinutes: number) => void;

  // Answer management
  initializeAnswers: (questions: Question[]) => void;
  updateMCQAnswer: (questionId: string, optionIndex: number) => void;
  updateCodeAnswer: (questionId: string, language: SupportedLanguage, code: string) => void;
  getAnswer: (questionId: string) => Answer | undefined;
  isQuestionAnswered: (questionId: string) => boolean;

  // Navigation
  goToQuestion: (index: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;

  // Computed
  currentQuestion: () => Question | null;

  // Reset
  reset: () => void;
}

const initialState = {
  status: "LOADING" as AttemptStatus,
  errorMessage: null,
  accessCode: null,
  test: null,
  candidateEmail: null,
  attemptId: null,
  token: null,
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  timeLeftSeconds: 0,
  startedAt: null,
};

export const useTestAttemptStore = create<TestAttemptState>((set, get) => ({
  ...initialState,

  // Status actions
  setStatus: (status) => set({ status }),
  setError: (message) => set({ errorMessage: message, status: message ? "INVALID" : get().status }),
  setAccessCode: (code) => set({ accessCode: code }),
  setTest: (test) => set({ test }),
  setCandidateEmail: (email) => set({ candidateEmail: email }),
  setAttemptId: (id) => set({ attemptId: id }),
  setToken: (token) => set({ token }),
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setTimeLeft: (seconds) => set({ timeLeftSeconds: seconds }),
  
  decrementTime: () => {
    const current = get().timeLeftSeconds;
    if (current > 0) {
      set({ timeLeftSeconds: current - 1 });
    }
  },

  startTimer: (totalMinutes) => {
    set({
      timeLeftSeconds: totalMinutes * 60,
      startedAt: new Date(),
    });
  },

  // Answer management
  initializeAnswers: (questions) => {
    set({
      answers: questions.map((q) => ({
        questionId: q.id,
        type: q.type,
      })),
    });
  },

  updateMCQAnswer: (questionId, optionIndex) => {
    set((state) => ({
      answers: state.answers.map((a) =>
        a.questionId === questionId ? { ...a, mcqAnswer: optionIndex } : a
      ),
    }));
  },

  updateCodeAnswer: (questionId, language, code) => {
    set((state) => ({
      answers: state.answers.map((a) =>
        a.questionId === questionId
          ? { ...a, codeAnswer: { language, code } }
          : a
      ),
    }));
  },

  getAnswer: (questionId) => {
    return get().answers.find((a) => a.questionId === questionId);
  },

  isQuestionAnswered: (questionId) => {
    const answer = get().answers.find((a) => a.questionId === questionId);
    if (!answer) return false;
    if (answer.type === "MCQ") return answer.mcqAnswer !== undefined;
    if (answer.type === "CODING") {
      return !!(answer.codeAnswer?.code && answer.codeAnswer.code.trim() !== "");
    }
    return false;
  },

  // Navigation
  goToQuestion: (index) => {
    const questions = get().questions;
    if (index >= 0 && index < questions.length) {
      set({ currentQuestionIndex: index });
    }
  },

  goToNextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  goToPreviousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  // Computed
  currentQuestion: () => {
    const { questions, currentQuestionIndex } = get();
    return questions[currentQuestionIndex] || null;
  },

  // Reset
  reset: () => set(initialState),
}));
