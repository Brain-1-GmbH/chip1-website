import React from "react";
import { Link } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  tags: string[];
  department: string;
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Key Account Manager (m/w/d) / Vertriebsmitarbeiter Außendienst",
    type: "Permanent employee, Full-time",
    location: "Neu-Isenburg",
    description:
      "Wir suchen einen erfahrenen Key Account Manager für den Außendienst, der unsere Kundenbeziehungen stärkt und neue Geschäftsmöglichkeiten identifiziert.",
    tags: ["7+ years", "Market knowledge", "High degree", "Interpersonal skills", "Fluent German"],
    department: "sales",
  },
  {
    id: "2",
    title: "Key Account Manager (m/w/d) / Vertriebsmitarbeiter Außendienst",
    type: "Permanent employee, Full-time",
    location: "Neu-Isenburg",
    description:
      "Wir suchen einen erfahrenen Key Account Manager für den Außendienst, der unsere Kundenbeziehungen stärkt und neue Geschäftsmöglichkeiten identifiziert.",
    tags: ["7+ years", "Market knowledge", "High degree", "Interpersonal skills", "Fluent German"],
    department: "sales",
  },
  {
    id: "3",
    title: "Key Account Manager (m/w/d) / Vertriebsmitarbeiter Außendienst",
    type: "Permanent employee, Full-time",
    location: "Neu-Isenburg",
    description:
      "Wir suchen einen erfahrenen Key Account Manager für den Außendienst, der unsere Kundenbeziehungen stärkt und neue Geschäftsmöglichkeiten identifiziert.",
    tags: ["7+ years", "Market knowledge", "High degree", "Interpersonal skills", "Fluent German"],
    department: "sales",
  },
  {
    id: "4",
    title: "Key Account Manager (m/w/d) / Vertriebsmitarbeiter Außendienst",
    type: "Permanent employee, Full-time",
    location: "Neu-Isenburg",
    description:
      "Wir suchen einen erfahrenen Key Account Manager für den Außendienst, der unsere Kundenbeziehungen stärkt und neue Geschäftsmöglichkeiten identifiziert.",
    tags: ["7+ years", "Market knowledge", "High degree", "Interpersonal skills", "Fluent German"],
    department: "sales",
  },
  {
    id: "5",
    title: "Key Account Manager (m/w/d) / Vertriebsmitarbeiter Außendienst",
    type: "Permanent employee, Full-time",
    location: "Neu-Isenburg",
    description:
      "Wir suchen einen erfahrenen Key Account Manager für den Außendienst, der unsere Kundenbeziehungen stärkt und neue Geschäftsmöglichkeiten identifiziert.",
    tags: ["7+ years", "Market knowledge", "High degree", "Interpersonal skills", "Fluent German"],
    department: "trainee",
  },
];

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  // Group tags into rows of 2
  const tagRows: string[][] = [];
  for (let i = 0; i < job.tags.length; i += 2) {
    tagRows.push(job.tags.slice(i, i + 2));
  }

  return (
    <div
      className="border hover:border-[#99c221]/50 transition-colors"
      style={{
        display: "flex",
        padding: "24px",
        alignItems: "flex-start",
        gap: "40px",
        alignSelf: "stretch",
        borderRadius: "16px",
        border: "1px solid #1C1D22",
      }}
    >
      {/* Left Side - Job Info Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
          alignSelf: "stretch",
          flex: "1 0 0",
        }}
      >
        <div className="flex flex-col gap-2">
          <h3
            className="text-lg md:text-xl font-semibold text-[#efeff0] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {job.title}
          </h3>
          <div className="flex flex-row gap-2 items-center">
            <p
              className="text-sm"
              style={{
                color: "#CECECF",
                fontFamily: "Inter, sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
              }}
            >
              {job.type}
            </p>
            <p
              className="text-sm"
              style={{
                color: "#CECECF",
                fontFamily: "Inter, sans-serif",
                fontStyle: "normal",
                fontWeight: 600,
              }}
            >
              {job.location}
            </p>
          </div>
        </div>
        <p className="text-base text-[#b6b6b7] leading-[1.5] line-clamp-2">
          {job.description}
        </p>
        <Link
          to={`/careers/${job.id}`}
          className="text-[#99c221] hover:text-[#B8D434] transition-colors text-sm font-medium inline-flex items-center gap-1 w-fit"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          VIEW MORE
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="inline-block"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Tags under VIEW MORE button */}
        <div className="flex flex-col gap-2 mt-2">
          {tagRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((tag, tagIndex) => (
                <span
                  key={`${rowIndex}-${tagIndex}`}
                  className="whitespace-nowrap text-xs text-[#b6b6b7]"
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    alignItems: "center",
                    gap: "16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(77, 77, 78, 0.34)",
                    background: "#111215",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const JobListingsSection: React.FC = () => {
  // Group jobs by department
  const jobsByDepartment = jobs.reduce((acc, job) => {
    if (!acc[job.department]) {
      acc[job.department] = [];
    }
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  const departmentLabels: Record<string, string> = {
    sales: "Sales",
    trainee: "Trainee",
    engineering: "Engineering",
    operations: "Operations",
    marketing: "Marketing",
  };

  return (
    <section className="bg-[#0e0e0f] py-10 md:py-24 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[60px]">
        <div className="flex flex-col gap-12">
          {Object.entries(jobsByDepartment).map(([department, departmentJobs]) => (
            <div key={department} className="flex flex-col gap-6">
              {/* Department Header */}
              <h3
                className="text-2xl md:text-3xl font-semibold text-[#efeff0]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {departmentLabels[department] || department}
              </h3>

              {/* Job Cards */}
              <div className="flex flex-col gap-4">
                {departmentJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
