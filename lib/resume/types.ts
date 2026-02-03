/**
 * Types for Resume/CV data used in PDF generation
 * These types represent the complete resume data structure
 */

export type ResumePerson = {
    fullName: string;
    role: string;
    location: string;
    email: string;
    phone?: string | null;
    website?: string | null;
    github?: string | null;
    linkedin?: string | null;
    availabilityLabel?: string | null;
    shortBio: string;
    about: string[];
    // Optional list of languages the person speaks
    languages?: string[];
    // Optional list of interests/hobbies
    interests?: string[];
};

export type ResumeHighlight = {
    label: string;
    value: string;
    hint?: string | null;
    order: number;
};

export type ResumeSkill = {
    name: string;
    category: "primary" | "secondary" | "tooling";
    order: number;
};

export type ResumeExperience = {
    company: string;
    title: string;
    location?: string | null;
    startDate: string;
    endDate: string;
    summary?: string | null;
    bullets: string[];
    tech: string[];
    order: number;
};

export type ResumeProject = {
    slug: string;
    name: string;
    summary: string;
    description?: string | null;
    role?: string | null;
    highlights: string[];
    tech: string[];
    liveUrl?: string | null;
    repoUrl?: string | null;
    order: number;
};

export type ResumeEducation = {
    institution: string;
    degree: string;
    field?: string | null;
    startDate: string;
    endDate?: string | null;
    description?: string | null;
    order: number;
};

export type ResumeData = {
    id: string;
    locale: string;
    person: ResumePerson;
    highlights: ResumeHighlight[];
    skills: {
        primary: string[];
        secondary: string[];
        tooling: string[];
    };
    experiences: ResumeExperience[];
    projects: ResumeProject[];
    education: ResumeEducation[];
};
