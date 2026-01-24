import { create } from "zustand";
import type { editor } from "monaco-editor";

export type SupportedLanguage = "cpp" | "java" | "python" | "javascript" | "c";

export const LANGUAGE_CONFIG: Record<
  SupportedLanguage,
  {
    label: string;
    monacoLanguage: string;
    pistonRuntime: { language: string; version: string };
  }
> = {
  cpp: {
    label: "C++",
    monacoLanguage: "cpp",
    pistonRuntime: { language: "c++", version: "10.2.0" },
  },
  c: {
    label: "C",
    monacoLanguage: "c",
    pistonRuntime: { language: "c", version: "10.2.0" },
  },
  java: {
    label: "Java",
    monacoLanguage: "java",
    pistonRuntime: { language: "java", version: "15.0.2" },
  },
  python: {
    label: "Python",
    monacoLanguage: "python",
    pistonRuntime: { language: "python", version: "3.10.0" },
  },
  javascript: {
    label: "JavaScript",
    monacoLanguage: "javascript",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
  },
};

interface CodeEditorState {
  language: SupportedLanguage;
  fontSize: number;
  theme: "vs-dark" | "light";
  output: string;
  isRunning: boolean;
  error: string | null;
  editor: editor.IStandaloneCodeEditor | null;
  executionResult: {
    code: string;
    output: string;
    error: string | null;
  } | null;

  getCode: () => string;
  setEditor: (editor: editor.IStandaloneCodeEditor) => void;
  setTheme: (theme: "vs-dark" | "light") => void;
  setFontSize: (fontSize: number) => void;
  setLanguage: (language: SupportedLanguage) => void;
  runCode: (customInput?: string) => Promise<void>;
  resetOutput: () => void;
}

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "cpp" as SupportedLanguage,
      fontSize: 14,
      theme: "vs-dark" as const,
    };
  }

  const savedLanguage =
    (localStorage.getItem("editor-language") as SupportedLanguage) || "cpp";
  const savedTheme =
    (localStorage.getItem("editor-theme") as "vs-dark" | "light") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 14;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: editor.IStandaloneCodeEditor) => {
      set({ editor });
    },

    setTheme: (theme: "vs-dark" | "light") => {
      if (typeof window !== "undefined") {
        localStorage.setItem("editor-theme", theme);
      }
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("editor-font-size", fontSize.toString());
      }
      set({ fontSize });
    },

    setLanguage: (language: SupportedLanguage) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("editor-language", language);
      }
      set({
        language,
        output: "",
        error: null,
      });
    },

    resetOutput: () => {
      set({ output: "", error: null, executionResult: null });
    },

    runCode: async (customInput?: string) => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
            stdin: customInput || "",
          }),
        });

        const data = await response.json();

        // Handle API-level errors
        if (data.message) {
          set({
            error: data.message,
            executionResult: { code, output: "", error: data.message },
          });
          return;
        }

        // Handle compilation errors
        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;
          set({
            error,
            executionResult: { code, output: "", error },
          });
          return;
        }

        // Handle runtime errors
        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: { code, output: "", error },
          });
          return;
        }

        // Success
        const output = data.run.output;
        set({
          output: output.trim(),
          error: null,
          executionResult: { code, output: output.trim(), error: null },
        });
      } catch (error) {
        console.error("Error running code:", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});
