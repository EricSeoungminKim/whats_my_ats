import { featureHighlights, upcoming, workflow } from "@/database/hardcode";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.backgroundGlow} />
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerStack}`}>
          <span className={styles.badge}>Personal build in progress</span>
          <h1 className={styles.heroTitle}>
            What&apos;s My ATS? <br />
            helps your resume speak the same language as every company
          </h1>
          <p className={styles.heroParagraph}>
            Upload your resume, point to a target job, and get laser-focused ATS
            insights, rewrite suggestions, and project ideas that keep you ahead
            of automated screens.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.primaryButton}>
              Try sample scoring flow
            </button>
            <button className={styles.secondaryButton}>View roadmap</button>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.sectionHeading}>Upload preview</p>
              <h2 className={styles.heroCopyHeading}>
                One place to compare resumes and job descriptions
              </h2>
              <p className={styles.heroCopyParagraph}>
                Start with a drag-and-drop upload area, add the job posting, and
                keep every iteration in a version timeline so you can compare
                scores.
              </p>
            </div>
            <div className={styles.heroCards}>
              <div className={styles.dropArea}>
                Drop resume here or <strong>browse files</strong>
              </div>
              <div className={styles.jobCard}>
                <p className={styles.jobCardLabel}>Target job snapshot</p>
                <div className={styles.jobCardContent}>
                  <p>Company: Google</p>
                  <p>Role: Senior Data Analyst</p>
                  <p className={styles.jobCardHighlight}>
                    Matching keywords: 63%
                  </p>
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
              <div className={styles.roadmapCard}>
                <h2 className={styles.sectionTitle}>Road to a private beta</h2>
                <p className={styles.sectionParagraph}>
                  While the scoring engine comes together, the UI is ready to
                  host experiments. Here&apos;s what is queuing up next.
                </p>
                <ul className={styles.roadmapList}>
                  {upcoming.map((item) => (
                    <li key={item.title}>
                      <h3 className={styles.roadmapItemTitle}>{item.title}</h3>
                      <p className={styles.roadmapItemDetail}>{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.techCard}>
                <div>
                  <p className={styles.sectionHeading}>Tech stack</p>
                  <p className={styles.techParagraph}>
                    Next.js 14 + App Router, Tailwind CSS, TypeScript, shadcn/ui
                    inspired components, and a FastAPI scoring service with
                    spaCy, sentence-transformers, and OpenAI for rewrite
                    suggestions.
                  </p>
                </div>
                <div className={styles.techHighlight}>
                  Built as a personal playground to learn and ship quickly. The
                  UI stays lightweight while the scoring brain evolves behind a
                  clean API boundary.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>
            © {new Date().getFullYear()} What&apos;s My ATS? Crafted for
            personal growth.
          </p>
          <div className={styles.footerLinks}>
            <a href="#">Changelog</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
