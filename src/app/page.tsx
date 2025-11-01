"use client";

import { useMemo, useRef, useState } from "react";

import { ResumeUploader, AnalysisResponse } from "@/components/ResumeUploader";
import { featureHighlights, workflow } from "@/database/landing";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const formSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scoreLabel = useMemo(() => {
    if (!analysis) {
      return "--";
    }
    return `${analysis.score}/100`;
  }, [analysis]);

  return (
    <div className={styles.page}>
      <div className={styles.backgroundGlow} />
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerStack}`}>
          <span className={styles.badge}>Mock Test your ATS score</span>
          <h1 className={styles.heroTitle}>
            Welcome to <br />
            <span className={styles.titleGradient}>What&apos;s My ATS?</span>
          </h1>
          <p className={styles.heroParagraph}>
            Test whether your resume speaks the same language as every company&apos;s hiring stack.
            Upload, target the role you want, and iterate until your ATS score shines.
          </p>
          <div className={styles.atsInfo}>
            <div className={styles.atsCard}>
              <h2>What&apos;s ATS?</h2>
              <p>
                ATS stands for Applicant Tracking System. It&apos;s the automated
                gatekeeper that scans your resume for keywords, structure, and
                accomplishments before a recruiter ever reads it.
              </p>
            </div>
            <div className={styles.atsCard}>
              <h2>Why it matters</h2>
              <p>
                A resume that aligns with ATS expectations rises to the top of the
                list. Matching terminology, clean formatting, and role-specific
                impact statements dramatically increase your chances of landing an
                interview.
              </p>
            </div>
          </div>
          <button className={styles.getStartedButton} onClick={scrollToForm}>
            Get Started
          </button>
          {/* <div className={styles.heroActions}>
            <button className={styles.primaryButton}>
              Try sample scoring flow
            </button>
            <button className={styles.secondaryButton}>View roadmap</button>
          </div> */}
          <div className={styles.heroGrid} ref={formSectionRef}>
            <div className={styles.heroCopy}>
              <p className={styles.sectionHeading}>Upload preview</p>
              <h2 className={styles.heroCopyHeading}>
                <span>One place</span> to compare resumes and job descriptions
              </h2>
              <p className={styles.heroCopyParagraph}>
                Start with a drag-and-drop upload area, add the job posting, and
                keep every iteration in a version timeline so you can compare
                scores.
              </p>
              <form
                className={styles.targetForm}
                onSubmit={(event) => {
                  event.preventDefault();
                  setFormError(null);
                }}
              >
                <label className={styles.field}>
                  <span>Target company</span>
                  <input
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="e.g., Google"
                  />
                </label>
                <label className={styles.field}>
                  <span>Role</span>
                  <input
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    placeholder="e.g., SWE Intern"
                  />
                </label>
                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>Optional job description</span>
                  <textarea
                    value={jobDescription}
                    onChange={(event) => setJobDescription(event.target.value)}
                    placeholder="Paste keywords or a short job summary to boost accuracy (e.g., SWE Intern at Google focusing on backend services)."
                  />
                </label>
              </form>
              {formError && <p className={styles.formError}>{formError}</p>}
            </div>
            <div className={styles.heroCards}>
              <div className={styles.uploaderWrapper}>
                <ResumeUploader
                  company={company}
                  role={role}
                  jobDescription={jobDescription}
                  disabled={!company.trim() || !role.trim()}
                  onAnalysisComplete={(result) => {
                    setAnalysis(result);
                    setFormError(null);
                  }}
                  onError={(message) => setFormError(message)}
                />
              </div>
              <div className={styles.jobCard}>
                <p className={styles.jobCardLabel}>Target job snapshot</p>
                <div className={styles.jobCardContent}>
                  <p>Company: {company || "Add a company"}</p>
                  <p>Role: {role || "Select a role"}</p>
                  <p className={styles.jobCardHighlight}>
                    Matching keywords: {scoreLabel}
                  </p>
                  {analysis?.summary && (
                    <p className={styles.jobCardSummary}>{analysis.summary}</p>
                  )}
                  {analysis?.suggestions?.length ? (
                    <ul className={styles.jobCardSuggestions}>
                      {analysis.suggestions.slice(0, 3).map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={styles.featuresGrid}>
              {featureHighlights.map((feature) => (
                <article key={feature.title} className={styles.featureCard}>
                  <span className={styles.featureBadge}>{feature.badge}</span>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.workflowSection}>
          <div className={`${styles.container} ${styles.sectionStack}`}>
            <div className={styles.workflowIntro}>
              <p className={styles.sectionHeading}>Workflow</p>
              <h2 className={styles.sectionTitle}>
                Designed to iterate quickly without juggling tools
              </h2>
              <p className={styles.sectionParagraph}>
                Each step can be backed by serverless actions today and upgraded
                to background jobs or mobile flows when you are ready.
              </p>
            </div>
            <ol className={styles.workflowList}>
              {workflow.map((step, index) => (
                <li key={step.title} className={styles.workflowItem}>
                  <span className={styles.workflowNumber}>{index + 1}</span>
                  <h3 className={styles.workflowTitle}>{step.title}</h3>
                  <p className={styles.workflowDetail}>{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.roadmapSection}>
          <div className={styles.container}>
            <div className={styles.roadmapGrid}>
              <div className={styles.techCard}>
                <div>
                  <p className={styles.sectionHeading}>Tech stack</p>
                  <p className={styles.techParagraph}>
                    Next.js 16 + App Router, Tailwind CSS, TypeScript, and a
                    FastAPI scoring service backed by Gemini for resume insights
                  </p>
                </div>
                {/* <div className={styles.techHighlight}>
                  - Built as a personal playground to learn and ship quickly{" "}
                  <br />
                  <br />- The UI stays lightweight while the scoring brain
                  evolves behind a clean API boundary
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>
            © {new Date().getFullYear()} What&apos;s My ATS? — Built by
            Seoungmin Kim
          </p>
          <div className={styles.footerLinks}>
            <a
              href="https://github.com/EricSeoungminKim/whats_my_ats"
              target="_blank"
              rel="noopener noreferrer"
            >
              What&apos;s My ATS GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
