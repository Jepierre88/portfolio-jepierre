import prisma from "@/lib/prisma";
import type { Skill, Highlight, Experience, Project, Education } from "@/lib/generated/prisma/client";
import type { ResumeData } from "./types";

/**
 * Repository for Resume data access
 * Fetches complete resume data from the database for PDF generation
 */

export async function getActiveResumeByLocale(
    locale: string = "en"
): Promise<ResumeData | null> {
    const resume = await prisma.resume.findFirst({
        where: {
            locale,
            isActive: true,
        },
        include: {
            person: true,
            highlights: {
                orderBy: { order: "asc" },
            },
            skills: {
                orderBy: { order: "asc" },
            },
            experiences: {
                orderBy: { order: "asc" },
            },
            projects: {
                orderBy: { order: "asc" },
            },
            education: {
                orderBy: { order: "asc" },
            },
        },
    });

    if (!resume || !resume.person) {
        return null;
    }

    // Group skills by category
    const primarySkills = resume.skills
        .filter((s: Skill) => s.category === "primary")
        .map((s: Skill) => s.name);
    const secondarySkills = resume.skills
        .filter((s: Skill) => s.category === "secondary")
        .map((s: Skill) => s.name);
    const toolingSkills = resume.skills
        .filter((s: Skill) => s.category === "tooling")
        .map((s: Skill) => s.name);

    return {
        id: resume.id,
        locale: resume.locale,
        person: {
            fullName: resume.person.fullName,
            role: resume.person.role,
            location: resume.person.location,
            email: resume.person.email,
            phone: resume.person.phone,
            website: resume.person.website,
            github: resume.person.github,
            linkedin: resume.person.linkedin,
            availabilityLabel: resume.person.availabilityLabel,
            shortBio: resume.person.shortBio,
            about: resume.person.about,
        },
        highlights: resume.highlights.map((h: Highlight) => ({
            label: h.label,
            value: h.value,
            hint: h.hint,
            order: h.order,
        })),
        skills: {
            primary: primarySkills,
            secondary: secondarySkills,
            tooling: toolingSkills,
        },
        experiences: resume.experiences.map((e: Experience) => ({
            company: e.company,
            title: e.title,
            location: e.location,
            startDate: e.startDate,
            endDate: e.endDate,
            summary: e.summary,
            bullets: e.bullets,
            tech: e.tech,
            order: e.order,
        })),
        projects: resume.projects.map((p: Project) => ({
            slug: p.slug,
            name: p.name,
            summary: p.summary,
            description: p.description,
            role: p.role,
            highlights: p.highlights,
            tech: p.tech,
            liveUrl: p.liveUrl,
            repoUrl: p.repoUrl,
            order: p.order,
        })),
        education: resume.education.map((e: Education) => ({
            institution: e.institution,
            degree: e.degree,
            field: e.field,
            startDate: e.startDate,
            endDate: e.endDate,
            description: e.description,
            order: e.order,
        })),
    };
}

/**
 * Get all available resume locales
 */
export async function getAvailableLocales(): Promise<string[]> {
    const resumes = await prisma.resume.findMany({
        where: { isActive: true },
        select: { locale: true },
    });

    return resumes.map((r: { locale: string }) => r.locale);
}
