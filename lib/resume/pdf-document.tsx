import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Link,
} from "@react-pdf/renderer";
import type { ResumeData } from "./types";

// Register fonts for proper Unicode support (tildes, ñ, etc.)
Font.register({
    family: "OpenSans",
    fonts: [
        {
            src: "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-400-normal.ttf",
            fontWeight: 400,
        },
        {
            src: "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-600-normal.ttf",
            fontWeight: 600,
        },
        {
            src: "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-700-normal.ttf",
            fontWeight: 700,
        },
    ],
});

// Disable hyphenation for cleaner text
Font.registerHyphenationCallback((word) => [word]);

// Color palette aligned with the portfolio website (purple/violet theme)
const colors = {
    primary: "#7c3aed",
    primaryLight: "#a78bfa",
    text: "#1f2937",
    textMuted: "#6b7280",
    textLight: "#9ca3af",
    background: "#ffffff",
    backgroundAlt: "#f3f4f6",
    border: "#e5e7eb",
    white: "#ffffff",
};

// Professional, modern ATS-friendly styles
const styles = StyleSheet.create({
    page: {
        fontFamily: "OpenSans",
        fontSize: 10,
        paddingTop: 0,
        paddingBottom: 50,
        paddingHorizontal: 0,
        lineHeight: 1.5,
        color: colors.text,
        backgroundColor: colors.background,
    },
    // Header with colored background
    header: {
        backgroundColor: colors.primary,
        paddingVertical: 24,
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    name: {
        fontSize: 26,
        fontWeight: 700,
        color: colors.white,
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    role: {
        fontSize: 13,
        color: colors.white,
        marginBottom: 16,
        marginTop: 4,
    },
    contactRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },
    contactItem: {
        fontSize: 9,
        color: colors.white,
    },
    contactSeparator: {
        fontSize: 9,
        color: colors.white,
        opacity: 0.6,
    },
    // Main content area
    content: {
        paddingHorizontal: 40,
    },
    // Section styling
    section: {
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        paddingBottom: 4,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 700,
        color: colors.primary,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    // Summary/Bio
    summary: {
        fontSize: 10,
        color: colors.text,
        lineHeight: 1.6,
    },
    // Experience styling
    experienceItem: {
        marginBottom: 14,
    },
    experienceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 2,
    },
    experienceTitle: {
        fontSize: 11,
        fontWeight: 700,
        color: colors.text,
    },
    experienceDates: {
        fontSize: 9,
        color: colors.primary,
        fontWeight: 600,
    },
    experienceCompany: {
        fontSize: 10,
        color: colors.textMuted,
        marginBottom: 4,
    },
    experienceSummary: {
        fontSize: 9,
        color: colors.textMuted,
        marginBottom: 6,
        lineHeight: 1.5,
    },
    // Bullet points
    bulletList: {
        marginLeft: 0,
    },
    bulletItem: {
        flexDirection: "row",
        marginBottom: 3,
        paddingRight: 10,
    },
    bulletPoint: {
        width: 14,
        fontSize: 10,
        color: colors.primary,
        fontWeight: 700,
    },
    bulletText: {
        flex: 1,
        fontSize: 9,
        color: colors.text,
        lineHeight: 1.5,
    },
    // Tech stack
    techContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
        marginTop: 6,
    },
    techBadge: {
        backgroundColor: colors.backgroundAlt,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    techText: {
        fontSize: 8,
        color: colors.textMuted,
    },
    // Skills section
    skillsGrid: {
        gap: 10,
    },
    skillsCategory: {
        marginBottom: 6,
    },
    skillCategoryTitle: {
        fontSize: 10,
        fontWeight: 600,
        color: colors.text,
        marginBottom: 4,
    },
    skillsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
    },
    skillBadgePrimary: {
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    skillBadgeSecondary: {
        backgroundColor: colors.backgroundAlt,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    skillTextPrimary: {
        fontSize: 8,
        color: colors.white,
        fontWeight: 600,
    },
    skillTextSecondary: {
        fontSize: 8,
        color: colors.textMuted,
    },
    // Projects section
    projectItem: {
        marginBottom: 12,
    },
    projectHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 2,
    },
    projectName: {
        fontSize: 11,
        fontWeight: 700,
        color: colors.text,
    },
    projectRole: {
        fontSize: 9,
        color: colors.primary,
        fontWeight: 600,
    },
    projectSummary: {
        fontSize: 9,
        color: colors.textMuted,
        marginBottom: 4,
        lineHeight: 1.5,
    },
    projectLink: {
        fontSize: 8,
        color: colors.primary,
    },
    // Education section
    educationItem: {
        marginBottom: 10,
    },
    educationHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 2,
    },
    educationDegree: {
        fontSize: 11,
        fontWeight: 700,
        color: colors.text,
    },
    educationDates: {
        fontSize: 9,
        color: colors.primary,
        fontWeight: 600,
    },
    educationInstitution: {
        fontSize: 10,
        color: colors.textMuted,
    },
    educationDescription: {
        fontSize: 9,
        color: colors.textMuted,
        marginTop: 2,
    },
    // Footer
    footer: {
        position: "absolute",
        bottom: 20,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 8,
    },
    footerText: {
        fontSize: 8,
        color: colors.textLight,
    },
    pageNumber: {
        fontSize: 8,
        color: colors.textLight,
    },
});

type ResumeDocumentProps = {
    data: ResumeData;
    labels?: {
        summary?: string;
        experience?: string;
        skills?: string;
        projects?: string;
        education?: string;
        primary?: string;
        secondary?: string;
        tools?: string;
        present?: string;
    };
};

// Default labels (English)
const defaultLabels = {
    summary: "Professional Summary",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    primary: "Core Technologies",
    secondary: "Additional Skills",
    tools: "Tools & Platforms",
    present: "Present",
};

// Spanish labels
const spanishLabels = {
    summary: "Resumen Profesional",
    experience: "Experiencia",
    skills: "Habilidades",
    projects: "Proyectos",
    education: "Educación",
    primary: "Tecnologías Principales",
    secondary: "Habilidades Adicionales",
    tools: "Herramientas y Plataformas",
    present: "Presente",
};

export function getLabelsForLocale(locale: string) {
    return locale === "es" ? spanishLabels : defaultLabels;
}

/**
 * Modern, ATS-Friendly Resume Document Component
 * - Professional design with purple accent color
 * - Single column layout (ATS-compatible)
 * - Selectable text
 * - Clear visual hierarchy
 * - Skill badges with colors
 */
export function ResumeDocument({
    data,
    labels = defaultLabels,
}: ResumeDocumentProps) {
    const { person, skills, experiences, projects, education } = data;

    return (
        <Document
            title={`${person.fullName} - Resume`}
            author={person.fullName}
            subject="Professional Resume"
            keywords="resume, cv, developer, full-stack"
        >
            <Page size="LETTER" style={styles.page}>
                {/* Header with purple background */}
                <View style={styles.header}>
                    <Text style={styles.name}>{person.fullName}</Text>
                    <Text style={styles.role}>{person.role}</Text>
                    <View style={styles.contactRow}>
                        <Text style={styles.contactItem}>{person.email}</Text>
                        {person.phone && (
                            <>
                                <Text style={styles.contactSeparator}>|</Text>
                                <Text style={styles.contactItem}>
                                    {person.phone}
                                </Text>
                            </>
                        )}
                        <Text style={styles.contactSeparator}>|</Text>
                        <Text style={styles.contactItem}>{person.location}</Text>
                        {person.linkedin && (
                            <>
                                <Text style={styles.contactSeparator}>|</Text>
                                <Text style={styles.contactItem}>
                                    {person.linkedin.replace("https://www.", "")}
                                </Text>
                            </>
                        )}
                        {person.github && (
                            <>
                                <Text style={styles.contactSeparator}>|</Text>
                                <Text style={styles.contactItem}>
                                    {person.github.replace("https://", "")}
                                </Text>
                            </>
                        )}
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Professional Summary */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                {labels.summary}
                            </Text>
                        </View>
                        <Text style={styles.summary}>{person.shortBio}</Text>
                    </View>

                    {/* Skills */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                {labels.skills}
                            </Text>
                        </View>
                        <View style={styles.skillsGrid}>
                            {skills.primary.length > 0 && (
                                <View style={styles.skillsCategory}>
                                    <Text style={styles.skillCategoryTitle}>
                                        {labels.primary}
                                    </Text>
                                    <View style={styles.skillsRow}>
                                        {skills.primary.map((skill, index) => (
                                            <View
                                                key={index}
                                                style={styles.skillBadgePrimary}
                                            >
                                                <Text
                                                    style={
                                                        styles.skillTextPrimary
                                                    }
                                                >
                                                    {skill}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                            {skills.secondary.length > 0 && (
                                <View style={styles.skillsCategory}>
                                    <Text style={styles.skillCategoryTitle}>
                                        {labels.secondary}
                                    </Text>
                                    <View style={styles.skillsRow}>
                                        {skills.secondary.map((skill, index) => (
                                            <View
                                                key={index}
                                                style={styles.skillBadgeSecondary}
                                            >
                                                <Text
                                                    style={
                                                        styles.skillTextSecondary
                                                    }
                                                >
                                                    {skill}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                            {skills.tooling.length > 0 && (
                                <View style={styles.skillsCategory}>
                                    <Text style={styles.skillCategoryTitle}>
                                        {labels.tools}
                                    </Text>
                                    <View style={styles.skillsRow}>
                                        {skills.tooling.map((skill, index) => (
                                            <View
                                                key={index}
                                                style={styles.skillBadgeSecondary}
                                            >
                                                <Text
                                                    style={
                                                        styles.skillTextSecondary
                                                    }
                                                >
                                                    {skill}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Experience */}
                    {experiences.length > 0 && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    {labels.experience}
                                </Text>
                            </View>
                            {experiences.map((exp, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <View style={styles.experienceHeader}>
                                        <Text style={styles.experienceTitle}>
                                            {exp.title}
                                        </Text>
                                        <Text style={styles.experienceDates}>
                                            {exp.startDate} -{" "}
                                            {exp.endDate === "Present"
                                                ? labels.present
                                                : exp.endDate}
                                        </Text>
                                    </View>
                                    <Text style={styles.experienceCompany}>
                                        {exp.company}
                                        {exp.location ? ` · ${exp.location}` : ""}
                                    </Text>
                                    {exp.summary && (
                                        <Text style={styles.experienceSummary}>
                                            {exp.summary}
                                        </Text>
                                    )}
                                    <View style={styles.bulletList}>
                                        {exp.bullets.map((bullet, bulletIndex) => (
                                            <View
                                                key={bulletIndex}
                                                style={styles.bulletItem}
                                            >
                                                <Text style={styles.bulletPoint}>
                                                    •
                                                </Text>
                                                <Text style={styles.bulletText}>
                                                    {bullet}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                    {exp.tech.length > 0 && (
                                        <View style={styles.techContainer}>
                                            {exp.tech.map((tech, techIndex) => (
                                                <View
                                                    key={techIndex}
                                                    style={styles.techBadge}
                                                >
                                                    <Text style={styles.techText}>
                                                        {tech}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    {labels.projects}
                                </Text>
                            </View>
                            {projects.map((project, index) => (
                                <View key={index} style={styles.projectItem}>
                                    <View style={styles.projectHeader}>
                                        <Text style={styles.projectName}>
                                            {project.name}
                                        </Text>
                                        {project.role && (
                                            <Text style={styles.projectRole}>
                                                {project.role}
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={styles.projectSummary}>
                                        {project.summary}
                                    </Text>
                                    {project.highlights.length > 0 && (
                                        <View style={styles.bulletList}>
                                            {project.highlights.map(
                                                (highlight, hIndex) => (
                                                    <View
                                                        key={hIndex}
                                                        style={styles.bulletItem}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.bulletPoint
                                                            }
                                                        >
                                                            •
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.bulletText
                                                            }
                                                        >
                                                            {highlight}
                                                        </Text>
                                                    </View>
                                                )
                                            )}
                                        </View>
                                    )}
                                    {project.tech.length > 0 && (
                                        <View style={styles.techContainer}>
                                            {project.tech.map((tech, techIndex) => (
                                                <View
                                                    key={techIndex}
                                                    style={styles.techBadge}
                                                >
                                                    <Text style={styles.techText}>
                                                        {tech}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                    {project.liveUrl && (
                                        <Link
                                            src={project.liveUrl}
                                            style={styles.projectLink}
                                        >
                                            {project.liveUrl.replace(
                                                /^https?:\/\//,
                                                ""
                                            )}
                                        </Link>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    {labels.education}
                                </Text>
                            </View>
                            {education.map((edu, index) => (
                                <View key={index} style={styles.educationItem}>
                                    <View style={styles.educationHeader}>
                                        <Text style={styles.educationDegree}>
                                            {edu.degree}
                                            {edu.field ? ` - ${edu.field}` : ""}
                                        </Text>
                                        <Text style={styles.educationDates}>
                                            {edu.startDate}
                                            {edu.endDate
                                                ? ` - ${edu.endDate}`
                                                : ""}
                                        </Text>
                                    </View>
                                    <Text style={styles.educationInstitution}>
                                        {edu.institution}
                                    </Text>
                                    {edu.description && (
                                        <Text style={styles.educationDescription}>
                                            {edu.description}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Footer */}
                <View style={styles.footer} fixed>
                    <Text style={styles.footerText}>
                        {person.website
                            ? person.website.replace(/^https?:\/\//, "")
                            : person.email}
                    </Text>
                    <Text
                        style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) =>
                            `${pageNumber} / ${totalPages}`
                        }
                    />
                </View>
            </Page>
        </Document>
    );
}
