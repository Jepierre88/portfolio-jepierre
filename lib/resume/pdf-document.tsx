import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ResumeData } from "./types";

// ================= FONT =================
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
Font.registerHyphenationCallback((word) => [word]);

// ================= STYLES =================
const styles = StyleSheet.create({
  page: {
    fontFamily: "OpenSans",
    fontSize: 10,
    color: "#111827",
    backgroundColor: "#ffffff",
    padding: 0,
  },

  /* ---------- HEADER ---------- */
  headerRow: {
    flexDirection: "row",
    width: "100%",
    minHeight: 150,
  },
  headerLeft: {
    width: "38%",
    backgroundColor: "#0b0b0b",
    paddingHorizontal: 28,
    paddingVertical: 26,
    justifyContent: "center",
  },
  headerLine: {
    width: 50,
    height: 3,
    backgroundColor: "#ffffff",
    marginBottom: 14,
  },
  headerNameRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
  },
  headerName: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: 400,
    lineHeight: 1.1,
  },
  headerLastName: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginTop: 6,
  },

  /* ---- Experience badge ---- */
  expStackBadge: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 92,
  },
  expStackTopRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  expStackPlus: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: 700,
    marginRight: 2,
    lineHeight: 1,
  },
  expStackValue: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 1,
  },
  expStackUnit: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 9,
    fontWeight: 600,
    marginLeft: 4,
    lineHeight: 1,
    textTransform: "uppercase",
  },
  expStackLabel: {
    color: "rgba(229,231,235,0.95)",
    fontSize: 7,
    lineHeight: 1.2,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginTop: 2,
    textAlign: "right",
  },

  headerRight: {
    width: "62%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 34,
    paddingVertical: 26,
    justifyContent: "center",
  },
  headerRole: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 6,
    color: "#374151",
  },

  /* ---------- BODY ---------- */
  bodyRow: { flexDirection: "row", width: "100%" },
  leftCol: {
    width: "38%",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 24,
  },
  rightCol: {
    width: "62%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 34,
    paddingTop: 18,
    paddingBottom: 24,
  },

  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  paragraph: { fontSize: 10, color: "#374151", lineHeight: 1.5 },

  listItem: { flexDirection: "row", marginBottom: 6 },
  check: { width: 12, fontSize: 10, fontWeight: 700 },
  listText: { flex: 1, fontSize: 10, color: "#374151" },

  expBlock: { marginBottom: 14 },
  expCompany: { fontSize: 11, fontWeight: 700, textTransform: "uppercase" },
  expMeta: { fontSize: 9, color: "#6b7280", marginTop: 2, marginBottom: 6 },
  bulletRow: { flexDirection: "row", marginBottom: 4 },
  bulletDot: { width: 12, fontSize: 10, fontWeight: 700 },
  bulletText: { flex: 1, fontSize: 10, color: "#374151", lineHeight: 1.4 },

  eduTitle: { fontSize: 11, fontWeight: 700 },
  eduMeta: { fontSize: 9, color: "#6b7280", marginTop: 2 },
  eduSubtitle: { fontSize: 10, color: "#374151", marginTop: 3, lineHeight: 1.35 },
  certTitle: { fontSize: 11, fontWeight: 700 },
  certMeta: { fontSize: 9, color: "#6b7280", marginTop: 2 },
  certSubtitle: { fontSize: 10, color: "#374151", marginTop: 3, lineHeight: 1.35 },
});

// ================= COMPONENT =================
type Props = { data: ResumeData };

export function ResumeDocumentTemplate({ data }: Props) {
  const { person, experiences, education, skills } = data;

  const firstName = person.fullName?.split(" ")[0] ?? person.fullName;
  const lastName =
    person.fullName?.split(" ").slice(1).join(" ") ?? "";

  /* -------- EXPERIENCE YEARS CALC -------- */
  const monthNames: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, setiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
  };

  const parseMonthYear = (value?: string | null): Date | null => {
    if (!value) return null;
    const v = value.toLowerCase().trim();
    if (v === "present" || v === "presente") return new Date();
    const [m, y] = v.split(" ");
    if (monthNames[m] === undefined || !y) return null;
    return new Date(Number(y), monthNames[m], 1);
  };

  const totalMonths = experiences.reduce((sum, e) => {
    const s = parseMonthYear(e.startDate);
    const end = parseMonthYear(e.endDate);
    if (!s || !end) return sum;
    return sum + (end.getFullYear() - s.getFullYear()) * 12 + (end.getMonth() - s.getMonth()) + 1;
  }, 0);

  const years = Math.max(0, Math.floor(totalMonths / 12));

  const isCertification = (degree?: string | null) =>
    (degree ?? "").toLowerCase().includes("certif");

  const formalEducation = education.filter((e) => !isCertification(e.degree));
  const certifications = education.filter((e) => isCertification(e.degree));

  const formatDateRange = (start?: string | null, end?: string | null) => {
    if (!start && !end) return "";
    if (start && end) return `${start} – ${end}`;
    return start ?? end ?? "";
  };

  return (
    <Document title={`${person.fullName} - CV`}>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLine} />
            <View style={styles.headerNameRow}>
              <View>
                <Text style={styles.headerName}>{firstName}</Text>
                <Text style={styles.headerLastName}>{lastName.toUpperCase()}</Text>
              </View>

              <View style={styles.expStackBadge}>
                <View style={styles.expStackTopRow}>
                  <Text style={styles.expStackPlus}>+</Text>
                  <Text style={styles.expStackValue}>{years}</Text>
                  <Text style={styles.expStackUnit}>
                    {data.locale === "es" ? "AÑOS" : "YRS"}
                  </Text>
                </View>
                <Text style={styles.expStackLabel}>
                  {data.locale === "es"
                    ? "EXPERIENCIA\nPROFESIONAL"
                    : "PROFESSIONAL\nEXPERIENCE"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.headerRole}>{person.role}</Text>
            <Text style={styles.contactItem}>{person.location}</Text>
            {person.phone && <Text style={styles.contactItem}>{person.phone}</Text>}
            <Text style={styles.contactItem}>{person.email}</Text>
          </View>
        </View>

        {/* BODY */}
        <View style={styles.bodyRow}>
          {/* LEFT */}
          <View style={styles.leftCol}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {data.locale === "es" ? "Sobre mí" : "About Me"}
              </Text>
              <Text style={styles.paragraph}>{person.shortBio}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {data.locale === "es" ? "Programas" : "Tools"}
              </Text>
              {skills.tooling?.map((s, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.check}>✓</Text>
                  <Text style={styles.listText}>{s}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {data.locale === "es" ? "Habilidades" : "Skills"}
              </Text>
              {[...skills.primary, ...skills.secondary].map((s, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.check}>✓</Text>
                  <Text style={styles.listText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.rightCol}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {data.locale === "es" ? "Experiencia Profesional" : "Experience"}
              </Text>

              {experiences.map((exp, i) => (
                <View key={i} style={styles.expBlock}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expMeta}>
                    {exp.title} · {exp.startDate} – {exp.endDate}
                  </Text>

                  {exp.bullets?.map((b, j) => (
                    <View key={j} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {data.locale === "es" ? "Educación" : "Education"}
              </Text>

              {formalEducation.map((edu, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={styles.eduTitle}>
                    {edu.degree}
                    {edu.field ? ` — ${edu.field}` : ""}
                  </Text>
                  <Text style={styles.eduMeta}>
                    {edu.institution}
                    {formatDateRange(edu.startDate, edu.endDate)
                      ? ` · ${formatDateRange(edu.startDate, edu.endDate)}`
                      : ""}
                  </Text>
                  {edu.description ? (
                    <Text style={styles.eduSubtitle}>{edu.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>

            {certifications.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {data.locale === "es" ? "Certificaciones" : "Certifications"}
                </Text>

                {certifications.map((cert, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={styles.certTitle}>
                      {cert.description ?? cert.field ?? cert.degree}
                    </Text>
                    <Text style={styles.certMeta}>
                      {cert.institution}
                      {formatDateRange(cert.startDate, cert.endDate)
                        ? ` · ${formatDateRange(cert.startDate, cert.endDate)}`
                        : ""}
                    </Text>
                    {cert.field && cert.description ? (
                      <Text style={styles.certSubtitle}>{cert.field}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
}
