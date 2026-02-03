import type { ResumeData } from "./types";
import type { Portfolio } from "@/content/portfolio";

/**
 * Converts ResumeData (from database) to Portfolio format (for UI components)
 * This ensures the UI can consume data from the database
 */
export function resumeDataToPortfolio(data: ResumeData): Portfolio {
    return {
        person: {
            fullName: data.person.fullName,
            role: data.person.role,
            location: data.person.location,
            availabilityLabel: data.person.availabilityLabel ?? undefined,
            shortBio: data.person.shortBio,
            about: data.person.about,
        },
        links: {
            email: data.person.email,
            website: data.person.website ?? undefined,
            github: data.person.github ?? undefined,
            linkedin: data.person.linkedin ?? undefined,
            // Resume PDF will be generated dynamically
            resumePdf: `/api/resume?locale=${data.locale}`,
        },
        highlights: data.highlights.map((h) => ({
            label: h.label,
            value: h.value,
            hint: h.hint ?? undefined,
        })),
        skills: {
            primary: data.skills.primary,
            secondary: data.skills.secondary,
            tooling: data.skills.tooling,
        },
        experience: data.experiences.map((e) => ({
            company: e.company,
            title: e.title,
            location: e.location ?? undefined,
            start: e.startDate,
            end: e.endDate,
            summary: e.summary ?? undefined,
            bullets: e.bullets,
            tech: e.tech,
        })),
        projects: data.projects.map((p) => ({
            slug: p.slug,
            name: p.name,
            summary: p.summary,
            description: p.description ?? undefined,
            role: p.role ?? undefined,
            highlights: p.highlights,
            tech: p.tech,
            links: {
                live: p.liveUrl ?? undefined,
                repo: p.repoUrl ?? undefined,
            },
        })),
        // Education is not in the original Portfolio type, but we have it in the DB
        // You can extend the Portfolio type if needed
    };
}

/**
 * Type for Portfolio data that includes education (extended)
 */
export type PortfolioWithEducation = Portfolio & {
    education?: Array<{
        institution: string;
        degree: string;
        field?: string;
        startDate: string;
        endDate?: string;
        description?: string;
    }>;
};

/**
 * Converts ResumeData to extended Portfolio format with education
 */
export function resumeDataToPortfolioWithEducation(
    data: ResumeData
): PortfolioWithEducation {
    const portfolio = resumeDataToPortfolio(data);

    return {
        ...portfolio,
        education: data.education.map((e) => ({
            institution: e.institution,
            degree: e.degree,
            field: e.field ?? undefined,
            startDate: e.startDate,
            endDate: e.endDate ?? undefined,
            description: e.description ?? undefined,
        })),
    };
}
