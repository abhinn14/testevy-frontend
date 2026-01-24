"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Editor from "@monaco-editor/react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Send,
  Clock,
  CheckCircle,
  Loader2,
  LayoutGrid,
} from "lucide-react";

import {
  useCodeEditorStore,
  LANGUAGE_CONFIG,
  SupportedLanguage,
} from "@/store/useCodeEditorStore";
import { useTestAttemptStore, Question } from "../store/testAttempt.store";
import { useHeartbeat } from "../hooks/useHeartbeat";
import { useSubmitTest } from "../hooks/useSubmitTest";

export const TestAttempt = () => {
  const {
    questions,
    answers,
    currentQuestionIndex,
    timeLeftSeconds,
    goToQuestion,
    goToNextQuestion,
    updateMCQAnswer,
    updateCodeAnswer,
    isQuestionAnswered,
    currentQuestion: getCurrentQuestion,
  } = useTestAttemptStore();

  const currentQuestion = getCurrentQuestion();

  const {
    language,
    fontSize,
    output,
    isRunning,
    error: codeError,
    setLanguage,
    setEditor,
    runCode,
    getCode,
    resetOutput,
  } = useCodeEditorStore();

  const { submitTest, isSubmitting } = useSubmitTest();
  useHeartbeat();

  // UI State
  const [customInput, setCustomInput] = useState("");
  const [activeTab, setActiveTab] = useState<"test" | "custom" | "output">("test");

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Save current code to store
  const saveCurrentCode = useCallback(() => {
    if (currentQuestion?.type === "CODING") {
      const code = getCode();
      if (code) {
        updateCodeAnswer(currentQuestion.id, language, code);
      }
    }
  }, [currentQuestion, getCode, language, updateCodeAnswer]);

  // Handle question navigation
  const handleGoToQuestion = (index: number) => {
    saveCurrentCode();
    goToQuestion(index);
    resetOutput();
    setActiveTab("test");

    const nextQ = questions[index];
    if (nextQ?.type === "CODING" && nextQ?.content?.codeTemplates?.length) {
      const savedAnswer = answers.find((a) => a.questionId === nextQ.id);
      if (savedAnswer?.codeAnswer) {
        setLanguage(savedAnswer.codeAnswer.language);
      } else {
        setLanguage(nextQ.content.codeTemplates[0].language);
      }
    }
  };

  // Get initial code for editor
  const getInitialCode = useCallback(() => {
    if (!currentQuestion) return "";
    const savedAnswer = answers.find((a) => a.questionId === currentQuestion.id);
    if (savedAnswer?.codeAnswer?.language === language) {
      return savedAnswer.codeAnswer.code;
    }
    // Return template
    const template = currentQuestion.content.codeTemplates?.find(
      (t) => t.language === language
    );
    return template?.template || "";
  }, [currentQuestion, answers, language]);

  // Handle MCQ answer
  const handleMCQAnswer = (optionIndex: number) => {
    if (currentQuestion) {
      updateMCQAnswer(currentQuestion.id, optionIndex);
    }
  };

  // Run code
  const handleRunCode = () => {
    saveCurrentCode();
    const testCase = currentQuestion?.execution?.testCases?.find(
      (tc) => !tc.isHidden
    );
    runCode(testCase?.input || customInput);
  };

  // Submit current answer
  const handleSubmitAnswer = () => {
    saveCurrentCode();
    // Auto-advance to next question if not last
    if (currentQuestionIndex < questions.length - 1) {
      goToNextQuestion();
    }
  };

  // Handle finish test
  const handleFinishTest = async () => {
    saveCurrentCode();
    await submitTest();
  };

  // Set initial language when question changes
  useEffect(() => {
    if (
      currentQuestion?.type === "CODING" &&
      currentQuestion?.content?.codeTemplates?.length
    ) {
      const savedAnswer = answers.find((a) => a.questionId === currentQuestion.id);
      if (savedAnswer?.codeAnswer) {
        setLanguage(savedAnswer.codeAnswer.language);
      } else {
        setLanguage(currentQuestion.content.codeTemplates[0].language);
      }
    }
  }, [currentQuestion?.id]);

  if (!currentQuestion) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1a1a2e] text-white overflow-hidden">
      {/* Header */}
      <header className="flex-none h-14 bg-[#0f0f1a] border-b border-white/10 flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Testevy"
            width={100}
            height={40}
            className="object-contain"
            priority
          />
        </div>

        {/* Question Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleGoToQuestion(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => handleGoToQuestion(idx)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  idx === currentQuestionIndex
                    ? "bg-cyan-500 text-white"
                    : isQuestionAnswered(q.id)
                    ? "bg-green-500/30 text-green-400 border border-green-500/50"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              handleGoToQuestion(Math.min(questions.length - 1, currentQuestionIndex + 1))
            }
            disabled={currentQuestionIndex === questions.length - 1}
            className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <button className="ml-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <LayoutGrid size={18} />
          </button>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              timeLeftSeconds < 300
                ? "bg-red-500/20 text-red-400"
                : "bg-white/10"
            }`}
          >
            <Clock size={16} className={timeLeftSeconds < 300 ? "text-red-400" : "text-cyan-400"} />
            <span className="text-sm font-mono font-medium">
              {formatTime(timeLeftSeconds)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {/* Left Panel: Question */}
        <div className="w-[45%] h-full flex flex-col border-r border-white/10">
          {/* Question Header */}
          <div className="flex-none px-6 py-4 border-b border-white/10 bg-[#0f0f1a]/50">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                Question {currentQuestionIndex + 1}
              </span>
              <span className="text-sm text-white/60">
                Marks: {currentQuestion.marks}
              </span>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Problem Statement */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                Problem Statement
              </h3>
              <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                {currentQuestion.content.question}
              </div>
            </div>

            {/* Coding Question Details */}
            {currentQuestion.type === "CODING" && currentQuestion.execution && (
              <>
                {/* Constraints */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                    Constraints
                  </h3>
                  <div className="text-sm text-white/70 space-y-1">
                    <p>
                      Time Limit: {currentQuestion.execution.constraints.timeLimitMs}ms
                    </p>
                    <p>
                      Memory Limit: {currentQuestion.execution.constraints.memoryLimitMb}MB
                    </p>
                  </div>
                </div>

                {/* Sample Test Cases */}
                {currentQuestion.execution.testCases.some((tc) => !tc.isHidden) && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Sample Input/Output
                    </h3>
                    {currentQuestion.execution.testCases
                      .filter((tc) => !tc.isHidden)
                      .map((tc, i) => (
                        <div
                          key={i}
                          className="bg-[#0f0f1a] rounded-xl p-4 space-y-3"
                        >
                          <div>
                            <span className="text-xs font-medium text-white/50 uppercase">
                              Input
                            </span>
                            <pre className="mt-1 text-sm font-mono text-white/90 whitespace-pre-wrap">
                              {tc.input}
                            </pre>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-white/50 uppercase">
                              Output
                            </span>
                            <pre className="mt-1 text-sm font-mono text-white/90 whitespace-pre-wrap">
                              {tc.expectedOutput}
                            </pre>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Panel: Editor or MCQ */}
        <div className="w-[55%] h-full flex flex-col">
          {currentQuestion.type === "CODING" ? (
            <>
              {/* Editor Header */}
              <div className="flex-none h-12 px-4 flex items-center justify-end border-b border-white/10 bg-[#0f0f1a]/50">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {currentQuestion.content.codeTemplates?.map((t) => (
                    <option
                      key={t.language}
                      value={t.language}
                      className="bg-[#1a1a2e] text-white"
                    >
                      {LANGUAGE_CONFIG[t.language]?.label || t.language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  language={LANGUAGE_CONFIG[language]?.monacoLanguage || "cpp"}
                  theme="vs-dark"
                  value={getInitialCode()}
                  onMount={(editor) => setEditor(editor)}
                  onChange={() => saveCurrentCode()}
                  options={{
                    fontSize,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    padding: { top: 16 },
                  }}
                />
              </div>

              {/* Output Panel */}
              <div className="flex-none h-48 border-t border-white/10 flex flex-col">
                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 py-2 border-b border-white/10 bg-[#0f0f1a]/50">
                  <button
                    onClick={() => setActiveTab("test")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === "test"
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Test Cases
                  </button>
                  <button
                    onClick={() => setActiveTab("custom")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === "custom"
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Custom Input
                  </button>
                  <button
                    onClick={() => setActiveTab("output")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === "output"
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Output
                  </button>

                  <div className="flex-1" />

                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-1.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                  >
                    {isRunning ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                    Compile & Run
                  </button>
                  <button
                    onClick={handleSubmitAnswer}
                    className="flex items-center gap-2 px-4 py-1.5 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
                  >
                    <Send size={16} />
                    Submit Code
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-auto p-4 bg-[#0a0a14]">
                  {activeTab === "test" && (
                    <div className="text-sm font-mono">
                      {currentQuestion.execution?.testCases
                        .filter((tc) => !tc.isHidden)
                        .map((tc, i) => (
                          <div key={i} className="mb-2">
                            <span className="text-white/50">Test Case {i + 1}:</span>
                            <span className="ml-2 text-white/80">
                              {tc.input.split("\n")[0]}...
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                  {activeTab === "custom" && (
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter custom input..."
                      className="w-full h-full bg-transparent text-sm font-mono resize-none focus:outline-none text-white/90 placeholder:text-white/30"
                    />
                  )}
                  {activeTab === "output" && (
                    <div className="text-sm font-mono">
                      {codeError ? (
                        <pre className="text-red-400 whitespace-pre-wrap">{codeError}</pre>
                      ) : output ? (
                        <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                      ) : (
                        <span className="text-white/30">Run your code to see output...</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* MCQ Options */
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-6">Select your answer</h3>
              <div className="space-y-3">
                {currentQuestion.content.options?.map((opt, i) => {
                  const answer = answers.find((a) => a.questionId === currentQuestion.id);
                  const isSelected = answer?.mcqAnswer === i;
                  return (
                    <label
                      key={i}
                      onClick={() => handleMCQAnswer(i)}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-cyan-500/20 border-cyan-500/50"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-cyan-400 bg-cyan-400" : "border-white/40"
                        }`}
                      >
                        {isSelected && <CheckCircle size={14} className="text-black" />}
                      </div>
                      <span className="text-white/90 text-lg">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-none h-14 bg-[#0f0f1a] border-t border-white/10 flex items-center justify-between px-6">
        <button
          onClick={handleFinishTest}
          disabled={isSubmitting}
          className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Finish Test"}
        </button>

        <span className="text-sm text-white/40">Answer auto-saving...</span>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              handleGoToQuestion(Math.min(questions.length - 1, currentQuestionIndex + 1))
            }
            className="px-6 py-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmitAnswer}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-semibold hover:brightness-110 transition-colors"
          >
            Submit & Next
          </button>
        </div>
      </footer>
    </div>
  );
};
