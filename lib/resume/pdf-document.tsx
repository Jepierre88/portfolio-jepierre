import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ResumeData } from "./types";

// Mejor en Vercel: pon la fuente en /public/fonts y referencia local (más confiable que CDN)
// Ej: src: "/fonts/OpenSans-Regular.ttf"
Font.register({
  family: "OpenSans",
  fonts: [
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-400-normal.ttf", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-600-normal.ttf", fontWeight: 600 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-700-normal.ttf", fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    fontFamily: "OpenSans",
    fontSize: 10,
    color: "#111827",
    backgroundColor: "#ffffff",
    padding: 0,
  },

  // HEADER (arriba, 2 bloques)
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

  // BODY (2 columnas)
  bodyRow: {
    flexDirection: "row",
    width: "100%",
  },
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

  // Secciones
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  paragraph: { fontSize: 10, color: "#374151", lineHeight: 1.5 },

  // Listas (check o bullets)
  listItem: { flexDirection: "row", marginBottom: 6 },
  check: { width: 12, fontSize: 10, fontWeight: 700 },
  listText: { flex: 1, fontSize: 10, color: "#374151" },

  // Experiencia (derecha)
  expBlock: { marginBottom: 14 },
  expCompany: { fontSize: 11, fontWeight: 700, textTransform: "uppercase" },
  expMeta: { fontSize: 9, color: "#6b7280", marginTop: 2, marginBottom: 6 },
  bulletRow: { flexDirection: "row", marginBottom: 4 },
  bulletDot: { width: 12, fontSize: 10, fontWeight: 700 },
  bulletText: { flex: 1, fontSize: 10, color: "#374151", lineHeight: 1.4 },

  // Educación
  eduTitle: { fontSize: 11, fontWeight: 700 },
  eduMeta: { fontSize: 9, color: "#6b7280", marginTop: 2 },
});

type Props = { data: ResumeData };

export function ResumeDocumentTemplate({ data }: Props) {
  const { person, experiences, education, skills } = data;

  const firstName = person.fullName?.split(" ")?.[0] ?? person.fullName;
  const lastName = person.fullName?.split(" ")?.slice(1).join(" ") ?? "";

  return (
    <Document title={`${person.fullName} - CV`}>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLine} />
            <Text style={styles.headerName}>{firstName}</Text>
            <Text style={styles.headerLastName}>{lastName.toUpperCase()}</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.headerRole}>{person.role}</Text>
            <Text style={styles.contactItem}>{person.location}</Text>
            {person.phone ? <Text style={styles.contactItem}>{person.phone}</Text> : null}
            <Text style={styles.contactItem}>{person.email}</Text>
          </View>
        </View>

        {/* BODY */}
        <View style={styles.bodyRow}>
          {/* LEFT */}
          <View style={styles.leftCol}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Perfil</Text>
              <Text style={styles.paragraph}>{person.shortBio}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Programas</Text>
              {(skills.tooling ?? []).map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.check}>✓</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Habilidades Principales</Text>
              {(skills.primary ?? []).map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.check}>✓</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Habilidades Adicionales</Text>
              {(skills.secondary ?? []).map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.check}>✓</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Idiomas e intereses: si no los tienes en tu ResumeData, puedes añadirlos */}
            {person.languages?.length ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Idiomas</Text>
                {person.languages.map((lang: string, i: number) => (
                  <View key={i} style={styles.listItem}>
                    <Text style={styles.check}>✓</Text>
                    <Text style={styles.listText}>{lang}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {person.interests?.length ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Intereses</Text>
                {person.interests.map((it: string, i: number) => (
                  <View key={i} style={styles.listItem}>
                    <Text style={styles.check}>✓</Text>
                    <Text style={styles.listText}>{it}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          {/* RIGHT */}
          <View style={styles.rightCol}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experiencia Profesional</Text>

              {experiences.map((exp, i) => (
                <View key={i} style={styles.expBlock}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expMeta}>
                    {exp.title} · {exp.location ?? ""} · {exp.startDate} - {exp.endDate}
                  </Text>

                  {(exp.bullets ?? []).map((b, j) => (
                    <View key={j} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Educación</Text>

              {education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={styles.eduTitle}>
                    {edu.degree}{edu.field ? `, ${edu.field}` : ""}
                  </Text>
                  <Text style={styles.eduMeta}>
                    {edu.institution} · {edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ""}
                  </Text>
                  {edu.description ? (
                    <Text style={[styles.paragraph, { marginTop: 4 }]}>{edu.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
