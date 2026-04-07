import React from "react";

/** ---------- helpers ---------- */
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getPrimaryEmail(email) {
  return (email || "").split("|")[0].trim();
}

function initials(label) {
  const parts = (label || "").split(" ").filter(Boolean);
  const a = parts[0]?.[0] || "";
  const b = parts[1]?.[0] || "";
  return (a + b).toUpperCase() || (label?.slice(0, 2).toUpperCase() ?? "•");
}

/** ---------- UI building blocks ---------- */
function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="sectionHeader">
        {subtitle && <div className="kicker">{subtitle}</div>}
        <h2 className="h2">{title}</h2>
      </div>
      <div className="sectionBody">{children}</div>
    </section>
  );
}

function Card({ className, children }) {
  return <div className={cx("card", className)}>{children}</div>;
}

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function LinkBtn({ href, children, variant = "primary" }) {
  const cls = variant === "primary" ? "btn btnPrimary" : "btn btnGhost";
  const isExternal = href?.startsWith("http");
  return (
    <a
      className={cls}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

/** ---------- components ---------- */
function FlipProfile({ frontSrc, backSrc, alt = "Profile photo" }) {
  return (
    <div className="flipWrap" aria-label="Profile photo">
      <div className="flipInner">
        <div className="flipFace flipFront">
          <img className="flipImg" src={frontSrc} alt={alt} />
        </div>
        <div className="flipFace flipBack">
          <img className="flipImg" src={backSrc} alt={alt} />
        </div>
      </div>
    </div>
  );
}

function LogoStrip({ title, items }) {
  return (
    <div className="card">
      <div className="cardTitle">{title}</div>
      <div className="logoStrip" role="list">
        {items.map((it, idx) => (
          <div key={idx} className="logoItem" role="listitem" title={it.label}>
            {it.src ? (
              <img className="logoImgBig" src={it.src} alt={it.label} />
            ) : (
              <div className="logoFallback" aria-label={it.label}>
                {initials(it.label)}
              </div>
            )}
            <div className="logoText">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InlineBullets({ items }) {
  return (
    <div className="inlineBullets" aria-label="Finance skills">
      {items.map((x, i) => (
        <span key={i} className="inlineBullet">
          {x}
        </span>
      ))}
    </div>
  );
}

/** ---------- Education Timeline ---------- */
function EducationTimeline({ items }) {
  return (
    <div className="eduTimeline">
      <div className="eduLine" aria-hidden="true" />

      <div className="eduRow">
        {items.map((it, idx) => (
          <div key={idx} className="eduNode">
            <div className="eduDates">{it.dates}</div>

            <div className="eduBadge">
              {it.logo ? (
                <img className="eduBadgeImg" src={it.logo} alt={`${it.school} logo`} />
              ) : (
                <div className="eduBadgeFallback">{initials(it.school)}</div>
              )}
            </div>

            <div className="eduSchool">{it.school}</div>
            {it.location ? <div className="eduLocation">{it.location}</div> : null}
            <div className="eduDegree">{it.degree}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ---------- Experience cards ---------- */
function ExperienceCards({ experience }) {
  return (
    <div className="expGrid">
      {experience.map((item, idx) => (
        <div key={idx} className="expCardV2">
          {/* media header */}
          <div className="expMedia">
            {item.companyLogo ? (
              <img className="expMediaImg" src={item.companyLogo} alt={`${item.company} logo`} />
            ) : (
              <div className="expMediaFallback">{initials(item.company)}</div>
            )}
          </div>

          {/* body */}
          <div className="expBodyV2">
            <div className="expRole">{item.role}</div>
            <div className="expCompanyLine">
              <span className="expCompany">{item.company}</span>
              <span className="expSep">•</span>
              <span className="expDatesV2">{item.dates}</span>
            </div>

            <ul className="expBullets">
              {item.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            {item.techStack?.length ? (
              <div className="expTech">
                <span className="expTechLabel">Tech Stack:</span>{" "}
                <span className="expTechText">{item.techStack.join(", ")}</span>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

/** ---------- Certifications / Awards ---------- */
function CertificationsList({ certifications }) {
  return (
    <div className="certGrid">
      {certifications.map((c, idx) => (
        <Card key={idx} className="certCard certHover">
          <div className="certName">{c.name}</div>
          <div className="certMeta">
            {c.issuer}
            {c.date ? ` • ${c.date}` : ""}
          </div>
        </Card>
      ))}
    </div>
  );
}

function AwardsList({ awards }) {
  return (
    <div className="certGrid">
      {awards.map((a, idx) => (
        <Card key={idx} className="certCard certHover">
          <div className="certName">{a.name}</div>
          <div className="certMeta">{a.issuer}</div>
          {a.detail && <div className="muted mt8">{a.detail}</div>}
        </Card>
      ))}
    </div>
  );
}

/** ---------- Projects (horizontal cards) ---------- */
function HorizontalCard({ media, title, tags, links, bullets }) {
  return (
    <Card className="hCard">
      <div className="hCardMedia">{media}</div>

      <div className="hCardBody">
        <div className="hCardTop">
          <div>
            <div className="hCardTitle">{title}</div>
            {tags?.length ? (
              <div className="pillRow">
                {tags.map((t, i) => (
                  <Pill key={i}>{t}</Pill>
                ))}
              </div>
            ) : null}
          </div>

          <div className="hCardRight">
            {links?.length ? (
              <div className="projLinks">
                {links.map((l, i) => (
                  <a key={i} className="link" href={l.url} target="_blank" rel="noreferrer">
                    {l.label} →
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {bullets?.length ? (
          <ul className="list mt12">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}

function ProjectsList({ projects }) {
  return (
    <div className="stack">
      {projects.map((p, idx) => (
        <HorizontalCard
          key={idx}
          media={
            p.image ? (
              <img className="projectMediaImg" src={p.image} alt={`${p.title} preview`} />
            ) : (
              <div className="projectMediaFallback">Project</div>
            )
          }
          title={p.title}
          tags={p.tags}
          links={p.links}
          bullets={p.bullets}
        />
      ))}
    </div>
  );
}

function LeadershipList({ leadership }) {
  return (
    <div className="stack">
      {leadership.map((item, idx) => (
        <Card key={idx}>
          <div className="subhead">{item.title}</div>
          <ul className="list mt8">
            {item.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

/** ---------- content ---------- */
const CONTENT = {
  name: "Vijaya Govekar",
  titleLine: "MBA Finance at Stevens Institute of Technology",
  intro:
    "MBA Finance candidate focused on M&A and strategic finance, combining rigorous analysis with clear communication, stakeholder management, and execution. Experienced in financial reporting and analytics across global teams, with strengths in teamwork, leadership, and structured problem-solving. Currently preparing for CFA Level I and pursuing Summer 2026 opportunities in Investment Banking, M&A, and related finance roles.",
  location: "Hoboken, NJ",
  email: "vijayagovekar19@gmail.com | vgovekar@stevens.edu",
  linkedin: "https://www.linkedin.com/in/vijaya-govekar/",
  resumeUrl: "/Vijaya_Govekar_Resume.pdf",

  profileImages: {
    front: "/assets/profile/profile-1.png",
    back: "/assets/profile/profile-2.png",
  },

  toolLogos: [
    { label: "Microsoft Excel", src: "/assets/logos/skills/excel.png" },
    { label: "Microsoft PowerPoint", src: "/assets/logos/skills/powerpoint.png" },
    { label: "Power BI", src: "/assets/logos/skills/powerbi.png" },
    { label: "Tableau", src: "/assets/logos/skills/tableau.png" },
    { label: "SAP Analytics Cloud", src: "/assets/logos/skills/sap-analytics-cloud.png" },
    { label: "DOMO", src: "/assets/logos/skills/domo.png" },
    { label: "SQL", src: "/assets/logos/skills/sql.png" },
    { label: "IntelliJ", src: "/assets/logos/skills/intellij.png" },
  ],

  programmingLogos: [
    { label: "Java", src: "/assets/logos/skills/java.png" },
    { label: "Scala", src: "/assets/logos/skills/scala.png" },
    { label: "Python", src: "/assets/logos/skills/python.png" },
    { label: "C++", src: "/assets/logos/skills/C++.png" },
    { label: "JavaScript", src: "/assets/logos/skills/javascript.png" },
  ],

  financeSkills: [
    "Financial Modeling",
    "Valuation Support",
    "WACC / FCFE",
    "Budgeting & Forecasting",
    "Variance Analysis",
    "KPI Reporting",
    "DCF Modeling",
"M&A Analysis",
"Company Analysis",
"Strategic Reasoning",
"Client Communication",
"Presentation Skills",
  ],

  education: [
    {
      school: "Stevens Institute of Technology",
      location: "Hoboken, NJ",
      degree: "Master of Business Administration (Finance)",
      dates: "2025 – 2027 (Expected)",
      logo: "/assets/logos/universities/stevens.png",
    },
    {
      school: "SNDT Women's University",
      location: "Mumbai, India",
      degree: "B.Tech, Computer Science and Technology",
      dates: "2019 – 2023",
      logo: "/assets/logos/universities/umit.png",
    },
  ],

  experience: [
    {
  role: "Graduate Teaching Assistant – Managerial Judgment & Decision Making",
  company: "Stevens Institute of Technology",
  companyLogo: "/assets/logos/companies/ssb.jpeg",
  dates: "Jan 2026 – Present | Hoboken, NJ",
  bullets: [
    "Assessed and graded examinations and assignments for a 20-member graduate class with care to ensure accuracy and conformance with course rubrics and objectives.",
    "Evaluated assignments and provided structured feedback to improve analytical thinking and clarity of argumentation.",
    "Collaborated with the professor to streamline grading workflows and maintain consistency across evaluations.",
    "Assisted in-class operations and student engagement, improving participation and learning outcomes."
  ],
},
    {
      role: "Software Engineer",
      company: "Bank of America",
      companyLogo: "/assets/logos/companies/boa.png",
      dates: "Aug 2023 – Aug 2025 | Mumbai",
      bullets: [
        "Engineered and maintained reference data systems supporting client onboarding across 15+ EMEA markets, improving integration efficiency and reducing onboarding time by 15%.",
        "Optimized SQL-based data pipelines, improving reporting access for cross-functional teams and reducing data retrieval time by 20%.",
        "Implemented validation and audit scripts that improved data integrity by 25%, supporting compliance and operational accuracy.",
        "Streamlined reconciliation workflows, reducing manual processing by 40+ hours per month and improving month-end close reliability.",
      ],
      techStack: ["SPARQL", "Scala", "Data Pipelines", "Financial Reporting", "Automation"],
    },
    {
      role: "Financial Planning & Analysis",
      company: "Colgate-Palmolive Global Business Services",
      companyLogo: "/assets/logos/companies/colgate.png",
      dates: "Jan 2023 – Jun 2023 | Mumbai",
      bullets: [
        "Designed and launched 10+ dashboards in DOMO and SAP Analytics Cloud, reducing reporting turnaround time by 30%.",
        "Partnered with finance teams across 5 regions to support budgeting and rolling forecasts, improving forecast accuracy by 5%.",
        "Automated recurring reporting workflows, saving 20+ analyst hours per week and improving reporting consistency.",
        "Conducted variance analysis and standardized templates, enabling faster executive insights and higher data accuracy.",
      ],
      techStack: ["DOMO", "SAP Analytics Cloud", "Excel", "Forecasting", "Variance Analysis"],
    },
  ],

  certifications: [
    { name: "Introduction to Financial Markets", issuer: "Indian School of Business", date: "Sep 2020" },
    { name: "Successful Negotiation: Essential Strategies and Skills", issuer: "University of Michigan", date: "Jul 2020" },
    { name: "Data Science Math Skills", issuer: "Duke University", date: "Aug 2020" },
  ],

  awards: [
    { name: "Silver Award", issuer: "Bank of America", detail: "Rewarded for excellence in enhancing data solutions." },
  ],

  projects: [
    {
  title: "JPMorgan Chase – Investment Banking Job Simulation (Forage)",
  tags: ["Investment Banking", "M&A", "Valuation"],
  image: "/assets/projects/jpmc.png",
  bullets: [
    "Identified an ideal M&A target for a client by evaluating strategic fit, industry positioning, and financial criteria.",
    "Built a DCF valuation model and adjusted assumptions to reflect a competing bid and supply chain disruption.",
    "Prepared a concise 2-page client deliverable summarizing the target profile, valuation insights, and auction process."
  ],
  links: [
    {
      label: "Certificate",
      url: "/assets/reports/Certificate.pdf"
    },
  ],
},
    {
      title: "Tennis Analytics (Djokovic vs Alcaraz, 2021–2024)",
      tags: ["Analytics", "Data Visualization"],
      image: "/assets/projects/tennis.png",
      bullets: [
        "Merged multi-year match datasets; built summary tables for win-loss, serve efficiency, and return performance.",
        "Designed clear visuals across surfaces and key match metrics; delivered recommendations based on trends.",
        "Presented results with a structured narrative, highlighting strengths, gaps, and improvement opportunities.",
      ],
      links: [
        { label: "Report", url: "assets/reports/BIA500.pdf" },
      ],
    },
    {
      title: "Boost Candy & Co. – Pre-Workout Confectionery",
      tags: ["Marketing", "ROI Analysis"],
      image: "/assets/projects/boost.jpeg",
      bullets: [
        "Developed a go-to-market strategy for a fitness-focused consumer product with positioning and channel strategy.",
        "Built forecast, pricing model, and ROI analysis; projected ~9% profit margin within 12 months.",
        "Ran break-even and sensitivity analysis to assess risk drivers and upside scenarios.",
      ],
    },
    {
      title: "Crowdfunding using Blockchain",
      tags: ["Blockchain", "Authentication"],
      image: "/assets/projects/blockchain.jpg",
      bullets: [
        "Built smart contracts with MetaMask authentication and a React interface for secure transactions.",
        "Executed 25+ test transactions with <1% failure rate and improved processing efficiency by 15%.",
      ],
      links: [{ label: "Report", url: "assets/reports/blockchain.pdf" }],
    },
  ],

  leadership: [
    {
      title: "ESG SPOC | Bank of America",
      bullets: [
        "Led ESG-focused volunteer campaigns, increasing employee engagement by 20% and expanding participation across business units.",
        "Collaborated with 10+ NGO partners and internal teams to execute community drives and workshops, impacting 3,000+ community members.",
      ],
    },
    {
      title: "Chairperson | Women In Engineering (WIE UMIT)",
      bullets: [
        "Directed operations and budgeting for STEM outreach, driving a 30% increase in women’s participation at technical events.",
        "Strengthened financial oversight with faculty/student committees, improving fund tracking and event execution.",
      ],
    },
  ],
};

/** ---------- page ---------- */
export default function App() {
  const c = CONTENT;
  const primaryEmail = getPrimaryEmail(c.email);

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbarInner">
          <div className="brand">
            <div className="brandMark" aria-hidden="true" />
            <div className="brandText">
              <div className="brandName">{c.name}</div>
              <div className="brandMeta">{c.location}</div>
            </div>
          </div>

          <nav className="nav">
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#certifications">Certifications</a>
            <a href="#projects">Projects</a>
            <a href="#leadership">Leadership</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="topbarCtas">
            <LinkBtn href={c.resumeUrl} variant="ghost">
              Download Resume
            </LinkBtn>
            <LinkBtn href="#contact">Get in touch</LinkBtn>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container heroSingle">
            <div className="heroMain">
              <div className="heroName">{c.name}</div>
              <div className="heroTitle">{c.titleLine}</div>
              <p className="lead">{c.intro}</p>

              <div className="heroCtas">
                <LinkBtn href={c.linkedin} variant="primary">
                  LinkedIn
                </LinkBtn>
                <LinkBtn href={c.resumeUrl} variant="primary">
                  Resume
                </LinkBtn>
              </div>

              <div className="micro">
                <span className="dot" aria-hidden="true" />
                Open to: Summer 2026 opportunities (Investment Banking / M&A / Deal Advisory)
              </div>
            </div>

            <div className="heroSide">
              <FlipProfile frontSrc={c.profileImages.front} backSrc={c.profileImages.back} alt="Vijaya Govekar profile" />
            </div>
          </div>
        </section>

        <div className="container">
          <Section id="education" subtitle="Education" title="Education">
            <EducationTimeline items={c.education} />
          </Section>

          <Section id="experience" subtitle="Experience" title="Work experience">
            <ExperienceCards experience={c.experience} />
          </Section>

          <Section id="skills" subtitle="Skills" title="Skills">
            <div className="stack">
              <Card>
                <div className="cardTitle">Finance</div>
                <InlineBullets items={c.financeSkills} />
              </Card>

              <LogoStrip title="Tools" items={c.toolLogos} />
              <LogoStrip title="Programming Languages" items={c.programmingLogos} />
            </div>
          </Section>

          <Section id="certifications" subtitle="Credentials" title="Certifications & Awards">
            <div className="stack">
              <div>
                <div className="cardTitle">Certifications</div>
                <CertificationsList certifications={c.certifications} />
              </div>

              <div className="mt16">
                <div className="cardTitle">Awards</div>
                <AwardsList awards={c.awards} />
              </div>
            </div>
          </Section>

          <Section id="projects" subtitle="Projects" title="Projects">
            <ProjectsList projects={c.projects} />
          </Section>

          <Section id="leadership" subtitle="Leadership" title="Leadership">
            <LeadershipList leadership={c.leadership} />
          </Section>

          <Section id="contact" subtitle="Contact" title="Let’s connect">
            <Card>
              <div className="contactGrid">
                <div>
                  <div className="cardTitle">Contact</div>
                  <p className="muted">
                    If you’re hiring for Summer 2026 roles in Investment Banking, M&A, or related finance roles, I’d love to connect.
                    Email is the fastest way to reach me.
                  </p>
                  <p className="muted mt8">
                    <b>Email:</b> {primaryEmail}
                    <br />
                    <b>LinkedIn:</b> {c.linkedin}
                  </p>
                </div>

                <div className="contactActions">
                  <a className="btn btnPrimary" href={`mailto:${primaryEmail}`}>
                    Email me
                  </a>
                  <a className="btn btnGhost" href={c.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                  <a className="btn btnGhost" href={c.resumeUrl}>
                    Resume
                  </a>
                </div>
              </div>

              <div className="footerMeta">
                <span>
                  © {new Date().getFullYear()} <b>{c.name}</b>
                </span>
                <span className="sep">•</span>
                <span className="muted">Built with React</span>
              </div>
            </Card>
          </Section>
        </div>
      </main>
    </div>
  );
}
