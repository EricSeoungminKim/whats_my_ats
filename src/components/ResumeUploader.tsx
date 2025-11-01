"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import styles from "@/styles/ResumeUploader.module.css";

type UploadStatus = "idle" | "uploading" | "success" | "error";

// Allow the frontend to call whatever FastAPI base URL is configured in `.env.local`.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export interface AnalysisResponse {
  id: number;
  score: number;
  match_ratio: number;
  summary: string | null;
  missing_keywords: string[];
  suggestions: string[];
  resume?: {
    id: number;
    filename: string;
    content_type: string;
    size: number;
    created_at: string;
  } | null;
  job_target?: {
    id: number;
    company?: string | null;
    role?: string | null;
    job_description: string;
    created_at: string;
  } | null;
}

interface ResumeUploaderProps {
  company: string;
  role: string;
  jobDescription?: string;
  disabled?: boolean;
  onAnalysisComplete: (analysis: AnalysisResponse) => void;
  onError?: (message: string) => void;
}

export function ResumeUploader({
  company,
  role,
  jobDescription,
  disabled = false,
  onAnalysisComplete,
  onError,
}: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AnalysisResponse | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const resetFeedback = () => {
    setStatus("idle");
    setError(null);
    setResponse(null);
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }
    const candidate = files[0];
    if (
      !candidate.type.includes("pdf") &&
      !candidate.name.match(/\.(docx?|pdf)$/i)
    ) {
      setError("Please upload a PDF, DOC, or DOCX resume file.");
      setFile(null);
      setResponse(null);
      setStatus("error");
      return;
    }
    resetFeedback();
    setFile(candidate);
  }, []);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    handleFiles(event.currentTarget.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!company.trim() || !role.trim()) {
      const message = "Add both company and role before attaching a resume.";
      setError(message);
      setStatus("error");
      onError?.(message);
      return;
    }

    if (!file) {
      setError("Select a resume before uploading.");
      setStatus("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("company", company);
    formData.append("role", role);
    if (jobDescription?.trim()) {
      formData.append("job_description", jobDescription.trim());
    }

    try {
      setStatus("uploading");
      setError(null);

      const response = await fetch(`${API_BASE_URL}/analysis/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed. Please try again.");
      }

      const data = (await response.json()) as AnalysisResponse;
      setResponse(data);
      setStatus("success");
      onAnalysisComplete(data);
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Unexpected error while uploading.";
      setError(message);
      setStatus("error");
      onError?.(message);
    }
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div
        className={styles.dropzone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        data-state={status}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFilePicker();
          }
        }}
        onClick={openFilePicker}
      >
        <input
          ref={inputRef}
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          className={styles.input}
          onChange={handleInputChange}
          aria-label="Upload resume file"
        />
        <div className={styles.dropzoneContent}>
          <p className={styles.dropzoneTitle}>Drop your resume here</p>
          <p className={styles.dropzoneSubtitle}>
            PDF, DOC, or DOCX up to 5 MB
          </p>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={(event) => {
              event.preventDefault();
              openFilePicker();
            }}
          >
            Browse files
          </button>
        </div>
      </div>

      {file && (
        <div className={styles.fileCard}>
          <div>
            <p className={styles.fileName}>{file.name}</p>
            <p className={styles.fileMeta}>
              {(file.size / 1024).toFixed(1)} KB ·{" "}
              {file.type || "Unknown format"}
            </p>
          </div>
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              setFile(null);
              resetFeedback();
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }}
          >
            Remove
          </button>
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.primaryButton}
          disabled={status === "uploading" || disabled}
        >
          {status === "uploading" ? "Attaching..." : "Attach resume"}
        </button>
      </div>

      {status === "success" && response && (
        <div className={styles.feedbackSuccess} role="status">
          <p>Upload complete!</p>
          <p className={styles.hashText}>
            ATS score saved: {response.score}/100
          </p>
        </div>
      )}

      {status === "error" && error && (
        <div className={styles.feedbackError} role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
