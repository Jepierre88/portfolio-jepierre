import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import type { ResumeData } from "./types";

// Register fonts for proper Unicode support (tildes, ñ, etc.)
// Using Inter from Google Fonts CDN
Font.register({
    family: "Inter",
    fonts: [
        {
            src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2",
            fontWeight: 400,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff2",
            fontWeight: 600,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff2",
            fontWeight: 700,
        },
    ],
});

// ATS-friendly styles: simple, one column, clear hierarchy
const styles = StyleSheet.create({
    page: {
        fontFamily: "Inter",
        fontSize: 10,
        paddingTop: 30,
        paddingBottom: 40,
        paddingHorizontal: 40,
        lineHeight: 1.4,
        color: "#1a1a1a",
    },
    header: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
        paddingBottom: 12,
    },
    name: {
        fontSize: 22,
        fontWeight: 700,
        marginBottom: 4,
        color: "#0a0a0a",
    },
    role: {
        fontSize: 12,
        color: "#525252",
        marginBottom: 8,
    },
    contactInfo: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    contactItem: {
        fontSize: 9,
        color: "#525252",
    },
    contactSeparator: {
        fontSize: 9,
        color: "#d4d4d4",
        marginHorizontal: 4,
    },
    section: {
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 700,
        marginBottom: 8,
        color: "#171717",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
        paddingBottom: 4,
    },
    summary: {
        fontSize: 10,
        color: "#404040",
        marginBottom: 12,
        lineHeight: 1.5,
    },
    experienceItem: {
        marginBottom: 12,
    },
    experienceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 3,
    },
    experienceTitle: {
        fontSize: 11,
        fontWeight: 600,
        color: "#171717",
    },
    experienceDates: {
        fontSize: 9,
        color: "#525252",
    },
    experienceCompany: {
        fontSize: 10,
        color: "#404040",
        marginBottom: 4,
    },
    experienceSummary: {
        fontSize: 9,
        color: "#525252",
        marginBottom: 4,
        fontStyle: "italic",
    },
    bulletList: {
        marginLeft: 0,
    },
    bulletItem: {
        flexDirection: "row",
        marginBottom: 2,
    },
    bulletPoint: {
        width: 12,
        fontSize: 9,
        color: "#525252",
    },
    bulletText: {
        flex: 1,
        fontSize: 9,
        color: "#404040",
        lineHeight: 1.4,
    },
    techStack: {
        fontSize: 8,
        color: "#737373",
        marginTop: 4,
    },
    skillsContainer: {
        marginBottom: 4,
    },
    skillCategory: {
        fontSize: 10,
        fontWeight: 600,
        color: "#171717",
        marginBottom: 2,
    },
    skillsList: {
        fontSize: 9,
        color: "#404040",
        lineHeight: 1.5,
    },
    projectItem: {
        marginBottom: 10,
    },
    projectHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    projectName: {
        fontSize: 11,
        fontWeight: 600,
        color: "#171717",
    },
    projectRole: {
        fontSize: 9,
        color: "#525252",
    },
    projectSummary: {
        fontSize: 9,
        color: "#404040",
        marginBottom: 3,
    },
    educationItem: {
        marginBottom: 8,
    },
    educationHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    educationDegree: {
        fontSize: 11,
        fontWeight: 600,
        color: "#171717",
    },
    educationDates: {
        fontSize: 9,
        color: "#525252",
    },
    educationInstitution: {
        fontSize: 10,
        color: "#404040",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 8,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "#a3a3a3",
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
 * ATS-Friendly Resume Document Component
 * - Single column layout
 * - Selectable text
 * - Standard section titles
 * - Clear hierarchy
 * - No graphics or complex formatting
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
            keywords="resume, cv, developer"
        >
            <Page size="LETTER" style={styles.page}>
                {/* Header with contact info */}
                <View style={styles.header}>
                    <Text style={styles.name}>{person.fullName}</Text>
                    <Text style={styles.role}>{person.role}</Text>
                    <View style={styles.contactInfo}>
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
                                    {person.linkedin}
                                </Text>
                            </>
                        )}
                        {person.github && (
                            <>
                                <Text style={styles.contactSeparator}>|</Text>
                                <Text style={styles.contactItem}>
                                    {person.github}
                                </Text>
                            </>
                        )}
                        {person.website && (
                            <>
                                <Text style={styles.contactSeparator}>|</Text>
                                <Text style={styles.contactItem}>
                                    {person.website}
                                </Text>
                            </>
                        )}
                    </View>
                </View>

                {/* Professional Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{labels.summary}</Text>
                    <Text style={styles.summary}>{person.shortBio}</Text>
                </View>

                {/* Experience */}
                {experiences.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {labels.experience}
                        </Text>
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
                                    <Text style={styles.techStack}>
                                        Tech: {exp.tech.join(", ")}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{labels.skills}</Text>
                    {skills.primary.length > 0 && (
                        <View style={styles.skillsContainer}>
                            <Text style={styles.skillCategory}>
                                {labels.primary}:
                            </Text>
                            <Text style={styles.skillsList}>
                                {skills.primary.join(", ")}
                            </Text>
                        </View>
                    )}
                    {skills.secondary.length > 0 && (
                        <View style={styles.skillsContainer}>
                            <Text style={styles.skillCategory}>
                                {labels.secondary}:
                            </Text>
                            <Text style={styles.skillsList}>
                                {skills.secondary.join(", ")}
                            </Text>
                        </View>
                    )}
                    {skills.tooling.length > 0 && (
                        <View style={styles.skillsContainer}>
                            <Text style={styles.skillCategory}>
                                {labels.tools}:
                            </Text>
                            <Text style={styles.skillsList}>
                                {skills.tooling.join(", ")}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Projects */}
                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {labels.projects}
                        </Text>
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
                                    <Text style={styles.techStack}>
                                        Tech: {project.tech.join(", ")}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {labels.education}
                        </Text>
                        {education.map((edu, index) => (
                            <View key={index} style={styles.educationItem}>
                                <View style={styles.educationHeader}>
                                    <Text style={styles.educationDegree}>
                                        {edu.degree}
                                        {edu.field ? ` in ${edu.field}` : ""}
                                    </Text>
                                    <Text style={styles.educationDates}>
                                        {edu.startDate}
                                        {edu.endDate ? ` - ${edu.endDate}` : ""}
                                    </Text>
                                </View>
                                <Text style={styles.educationInstitution}>
                                    {edu.institution}
                                </Text>
                                {edu.description && (
                                    <Text style={styles.projectSummary}>
                                        {edu.description}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Page number */}
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    fixed
                />
            </Page>
        </Document>
    );
}
