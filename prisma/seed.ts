import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

/**
 * Seed script to populate the database with initial resume data
 * Run with: npx tsx prisma/seed.ts
 */

async function main() {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await prisma.resume.deleteMany();
    console.log("✓ Cleared existing data");

    // Create English resume
    const enResume = await prisma.resume.create({
        data: {
            locale: "en",
            isActive: true,
            person: {
                create: {
                    fullName: "Jean Ortiz",
                    role: "Software Developer",
                    location: "Sabaneta, Antioquia, Colombia",
                    email: "jepierre.dev@hotmail.com",
                    phone: "+57 3234409350",
                    website: "https://jepierre-dev.vercel.app",
                    github: "https://github.com/Jepierre88",
                    linkedin: "https://www.linkedin.com/in/jepierre89",
                    availabilityLabel: "Open to opportunities",
                    shortBio:
                        "I'm passionate about creating digital experiences that not only work well, but also feel right. I value teamwork, fresh ideas, and constant learning. I believe technology doesn't just solve problems—it can also inspire and connect people. I'm always looking for projects that challenge me and where I can contribute with creativity, commitment, and a drive to keep growing.",
                    about: [
                        "I'm a software developer passionate about building digital experiences that work well and feel right.",
                        "I value teamwork, fresh ideas, and constant learning. I believe technology can inspire and connect people.",
                        "I'm always looking for challenging projects where I can contribute with creativity and commitment.",
                        "My experience spans web development, cloud platforms, and building scalable applications for real-world business needs.",
                    ],
                },
            },
            highlights: {
                create: [
                    {
                        label: "Years",
                        value: "1+",
                        hint: "Professional experience",
                        order: 0,
                    },
                    {
                        label: "Projects",
                        value: "5+",
                        hint: "Shipped to production",
                        order: 1,
                    },
                    {
                        label: "Focus",
                        value: "Full-Stack",
                        hint: "Frontend & Backend",
                        order: 2,
                    },
                    {
                        label: "Certified",
                        value: "Azure",
                        hint: "Microsoft Fundamentals",
                        order: 3,
                    },
                ],
            },
            skills: {
                create: [
                    // Primary skills (High proficiency)
                    { name: "React", category: "primary", order: 0 },
                    { name: "Angular", category: "primary", order: 1 },
                    { name: "Next.js", category: "primary", order: 2 },
                    { name: "TypeScript", category: "primary", order: 3 },
                    { name: "Node.js", category: "primary", order: 4 },
                    { name: "Tailwind CSS", category: "primary", order: 5 },
                    // Secondary skills (Good proficiency)
                    { name: "Django", category: "secondary", order: 0 },
                    { name: "AWS", category: "secondary", order: 1 },
                    { name: "Microsoft Azure", category: "secondary", order: 2 },
                    { name: "Kotlin", category: "secondary", order: 3 },
                    { name: "PostgreSQL", category: "secondary", order: 4 },
                    { name: "MySQL", category: "secondary", order: 5 },
                    // Tooling
                    { name: "Git", category: "tooling", order: 0 },
                    { name: "Docker", category: "tooling", order: 1 },
                    { name: "Vercel", category: "tooling", order: 2 },
                    { name: "Flutter", category: "tooling", order: 3 },
                ],
            },
            experiences: {
                create: [
                    {
                        company: "Sun Valley Investments",
                        title: "Frontend Developer",
                        location: "Envigado, Antioquia, Colombia",
                        startDate: "June 2025",
                        endDate: "Present",
                        summary:
                            "Collaborated with the development team to plan, implement, and deploy various applications focused on developing and managing common processes within the organization.",
                        bullets: [
                            "Collaborated with the development team to plan and implement business applications",
                            "Deployed and maintained applications for internal process management",
                            "Developed user interfaces using Angular and modern frontend technologies",
                            "Contributed to digital transformation initiatives within the organization",
                        ],
                        tech: [
                            "Angular",
                            "TypeScript",
                            "Node.js",
                            "Flutter",
                            "Azure",
                        ],
                        order: 0,
                    },
                    {
                        company: "COINS TECH COLOMBIA",
                        title: "Web Developer",
                        location: "Medellín, Antioquia, Colombia",
                        startDate: "April 2024",
                        endDate: "June 2025",
                        summary:
                            "Led the creation and maintenance of scalable, high-performance web applications using Node.js.",
                        bullets: [
                            "Led development of scalable and high-performance web applications",
                            "Built and maintained frontend interfaces using Next.js and React",
                            "Integrated payment systems using Wompi for parking environments",
                            "Deployed applications on AWS infrastructure",
                            "Worked with LoopBack and NestJS for backend development",
                        ],
                        tech: [
                            "Next.js",
                            "TypeScript",
                            "Tailwind CSS",
                            "Node.js",
                            "LoopBack",
                            "NestJS",
                            "MySQL",
                            "AWS",
                            "Docker",
                        ],
                        order: 1,
                    },
                ],
            },
            projects: {
                create: [
                    {
                        slug: "glow-zuly",
                        name: "GLOW ZULY",
                        summary:
                            "E-commerce platform currently in development.",
                        description:
                            "GLOW ZULY is an e-commerce platform designed for modern online shopping experiences. The project focuses on creating a scalable and user-friendly shopping platform.",
                        role: "Full-Stack Developer",
                        highlights: [
                            "Building a complete e-commerce solution",
                            "Implementing modern UI/UX patterns",
                            "Setting up scalable infrastructure on Vercel",
                        ],
                        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
                        liveUrl: "https://glow-zuly.vercel.app",
                        order: 0,
                    },
                    {
                        slug: "chronopos",
                        name: "Chronopos",
                        summary:
                            "Point of sale system currently in development.",
                        description:
                            "Chronopos is a modern POS (Point of Sale) system designed for businesses. The platform aims to streamline sales operations and inventory management.",
                        role: "Developer",
                        highlights: [
                            "Developing POS functionalities",
                            "Creating intuitive sales interfaces",
                        ],
                        tech: ["Web Technologies"],
                        liveUrl: "https://pos.chronosoft.com.co",
                        order: 1,
                    },
                    {
                        slug: "aurum-suite",
                        name: "AURUM",
                        summary:
                            "Mining management platform for tracking gold processing operations.",
                        description:
                            "AURUM is a mining management platform designed to digitize and centralize operational data across gold production lifecycle. Collaborated with the development team to implement and create the platform.",
                        role: "Frontend Developer",
                        highlights: [
                            "Collaborated with the development team for platform implementation",
                            "Built user interfaces for mining operations management",
                            "Improved traceability and data consistency for gold processing",
                        ],
                        tech: ["Angular", "TypeScript", "Node.js"],
                        liveUrl: "https://aurumsuite.com.co",
                        order: 2,
                    },
                    {
                        slug: "coins-pay",
                        name: "Coins Pay",
                        summary:
                            "Payment platform for parking environments using WOMPI.",
                        description:
                            "Coins Pay is a payment platform designed for parking environments. The application integrates with Wompi as the payment provider to securely process parking session payments.",
                        role: "Frontend Developer",
                        highlights: [
                            "Developed payment interfaces for parking sessions",
                            "Integrated Wompi payment gateway",
                            "Built responsive UI for mobile-first payment flows",
                            "Deployed application on AWS infrastructure",
                        ],
                        tech: ["Next.js", "TypeScript", "Tailwind CSS", "AWS", "Wompi"],
                        liveUrl: "https://pay.coins-colombia.com",
                        order: 3,
                    },
                ],
            },
            education: {
                create: [
                    {
                        institution: "Institución Universitaria ITM",
                        degree: "Technology Degree",
                        field: "Software Development",
                        startDate: "February 2022",
                        endDate: "October 2025",
                        description:
                            "Information Technology, Communications, and Support Services",
                        order: 0,
                    },
                    // Certifications as education entries
                    {
                        institution: "Microsoft",
                        degree: "Certification",
                        field: "Azure Fundamentals",
                        startDate: "October 2025",
                        endDate: null,
                        description: "Microsoft Certified: Azure Fundamentals (AZ-900)",
                        order: 1,
                    },
                    {
                        institution: "Online Course",
                        degree: "Certification",
                        field: "Kotlin for Android",
                        startDate: "August 2023",
                        endDate: null,
                        description: "Advanced Kotlin and Intermediate Kotlin for Android Developers",
                        order: 2,
                    },
                ],
            },
        },
    });

    console.log(`✓ Created English resume (ID: ${enResume.id})`);

    // Create Spanish resume
    const esResume = await prisma.resume.create({
        data: {
            locale: "es",
            isActive: true,
            person: {
                create: {
                    fullName: "Jean Ortiz",
                    role: "Desarrollador de Software",
                    location: "Sabaneta, Antioquia, Colombia",
                    email: "jepierre.dev@hotmail.com",
                    phone: "+57 3234409350",
                    website: "https://jepierre-dev.vercel.app",
                    github: "https://github.com/Jepierre88",
                    linkedin: "https://www.linkedin.com/in/jepierre89",
                    availabilityLabel: "Abierto a oportunidades",
                    shortBio:
                        "Me apasiona crear experiencias digitales que no solo funcionen bien, sino que también se sientan bien. Valoro el trabajo en equipo, las ideas frescas y el aprendizaje constante. Creo que la tecnología no solo resuelve problemas, también puede inspirar y conectar personas. Siempre estoy en búsqueda de proyectos que me reten y en los que pueda aportar con creatividad, compromiso y ganas de seguir creciendo.",
                    about: [
                        "Soy un desarrollador de software apasionado por crear experiencias digitales que funcionen bien y se sientan bien.",
                        "Valoro el trabajo en equipo, las ideas frescas y el aprendizaje constante. Creo que la tecnología puede inspirar y conectar personas.",
                        "Siempre busco proyectos desafiantes donde pueda aportar con creatividad y compromiso.",
                        "Mi experiencia abarca desarrollo web, plataformas cloud y construcción de aplicaciones escalables para necesidades empresariales reales.",
                    ],
                },
            },
            highlights: {
                create: [
                    {
                        label: "Años",
                        value: "1+",
                        hint: "Experiencia profesional",
                        order: 0,
                    },
                    {
                        label: "Proyectos",
                        value: "5+",
                        hint: "En producción",
                        order: 1,
                    },
                    {
                        label: "Enfoque",
                        value: "Full-Stack",
                        hint: "Frontend y Backend",
                        order: 2,
                    },
                    {
                        label: "Certificado",
                        value: "Azure",
                        hint: "Microsoft Fundamentals",
                        order: 3,
                    },
                ],
            },
            skills: {
                create: [
                    // Primary skills (Alto nivel)
                    { name: "React", category: "primary", order: 0 },
                    { name: "Angular", category: "primary", order: 1 },
                    { name: "Next.js", category: "primary", order: 2 },
                    { name: "TypeScript", category: "primary", order: 3 },
                    { name: "Node.js", category: "primary", order: 4 },
                    { name: "Tailwind CSS", category: "primary", order: 5 },
                    // Secondary skills (Buen nivel)
                    { name: "Django", category: "secondary", order: 0 },
                    { name: "AWS", category: "secondary", order: 1 },
                    { name: "Microsoft Azure", category: "secondary", order: 2 },
                    { name: "Kotlin", category: "secondary", order: 3 },
                    { name: "PostgreSQL", category: "secondary", order: 4 },
                    { name: "MySQL", category: "secondary", order: 5 },
                    // Tooling
                    { name: "Git", category: "tooling", order: 0 },
                    { name: "Docker", category: "tooling", order: 1 },
                    { name: "Vercel", category: "tooling", order: 2 },
                    { name: "Flutter", category: "tooling", order: 3 },
                ],
            },
            experiences: {
                create: [
                    {
                        company: "Sun Valley Investments",
                        title: "Desarrollador Frontend",
                        location: "Envigado, Antioquia, Colombia",
                        startDate: "Junio 2025",
                        endDate: "Presente",
                        summary:
                            "Colaboré con el equipo de desarrollo para planear, implementar y desplegar distintas aplicaciones enfocadas al desarrollo y gestión de procesos comunes en la organización.",
                        bullets: [
                            "Colaboré con el equipo de desarrollo para planear e implementar aplicaciones empresariales",
                            "Desplegué y mantuve aplicaciones para gestión de procesos internos",
                            "Desarrollé interfaces de usuario usando Angular y tecnologías frontend modernas",
                            "Contribuí a iniciativas de transformación digital dentro de la organización",
                        ],
                        tech: [
                            "Angular",
                            "TypeScript",
                            "Node.js",
                            "Flutter",
                            "Azure",
                        ],
                        order: 0,
                    },
                    {
                        company: "COINS TECH COLOMBIA",
                        title: "Desarrollador Web",
                        location: "Medellín, Antioquia, Colombia",
                        startDate: "Abril 2024",
                        endDate: "Junio 2025",
                        summary:
                            "Lideré la creación y mantenimiento de aplicaciones web escalables y de alto rendimiento utilizando Node.js.",
                        bullets: [
                            "Lideré el desarrollo de aplicaciones web escalables y de alto rendimiento",
                            "Construí y mantuve interfaces frontend usando Next.js y React",
                            "Integré sistemas de pago usando Wompi para entornos de parqueaderos",
                            "Desplegué aplicaciones en infraestructura AWS",
                            "Trabajé con LoopBack y NestJS para desarrollo backend",
                        ],
                        tech: [
                            "Next.js",
                            "TypeScript",
                            "Tailwind CSS",
                            "Node.js",
                            "LoopBack",
                            "NestJS",
                            "MySQL",
                            "AWS",
                            "Docker",
                        ],
                        order: 1,
                    },
                ],
            },
            projects: {
                create: [
                    {
                        slug: "glow-zuly",
                        name: "GLOW ZULY",
                        summary:
                            "Plataforma de comercio electrónico actualmente en desarrollo.",
                        description:
                            "GLOW ZULY es una plataforma de comercio electrónico diseñada para experiencias de compra en línea modernas. El proyecto se enfoca en crear una plataforma de compras escalable y fácil de usar.",
                        role: "Desarrollador Full-Stack",
                        highlights: [
                            "Construyendo una solución de e-commerce completa",
                            "Implementando patrones modernos de UI/UX",
                            "Configurando infraestructura escalable en Vercel",
                        ],
                        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
                        liveUrl: "https://glow-zuly.vercel.app",
                        order: 0,
                    },
                    {
                        slug: "chronopos",
                        name: "Chronopos",
                        summary:
                            "Sistema de punto de venta actualmente en desarrollo.",
                        description:
                            "Chronopos es un sistema POS (Punto de Venta) moderno diseñado para negocios. La plataforma busca optimizar operaciones de ventas y gestión de inventario.",
                        role: "Desarrollador",
                        highlights: [
                            "Desarrollando funcionalidades de POS",
                            "Creando interfaces de ventas intuitivas",
                        ],
                        tech: ["Tecnologías Web"],
                        liveUrl: "https://pos.chronosoft.com.co",
                        order: 1,
                    },
                    {
                        slug: "aurum-suite",
                        name: "AURUM",
                        summary:
                            "Plataforma de gestión minera para seguimiento de operaciones de procesamiento de oro.",
                        description:
                            "AURUM es una plataforma de gestión minera diseñada para digitalizar y centralizar datos operacionales a lo largo del ciclo de vida de producción de oro. Colaboré con el equipo de desarrollo para la implementación y creación de la plataforma.",
                        role: "Desarrollador Frontend",
                        highlights: [
                            "Colaboré con el equipo de desarrollo para la implementación de la plataforma",
                            "Construí interfaces de usuario para gestión de operaciones mineras",
                            "Mejoré la trazabilidad y consistencia de datos para procesamiento de oro",
                        ],
                        tech: ["Angular", "TypeScript", "Node.js"],
                        liveUrl: "https://aurumsuite.com.co",
                        order: 2,
                    },
                    {
                        slug: "coins-pay",
                        name: "Coins Pay",
                        summary:
                            "Plataforma de pagos para entorno de parqueaderos usando WOMPI.",
                        description:
                            "Coins Pay es una plataforma de pagos diseñada para entornos de parqueaderos. La aplicación se integra con Wompi como proveedor de pagos para procesar de forma segura los pagos de sesiones de parqueo.",
                        role: "Desarrollador Frontend",
                        highlights: [
                            "Desarrollé interfaces de pago para sesiones de parqueo",
                            "Integré la pasarela de pagos Wompi",
                            "Construí UI responsiva para flujos de pago mobile-first",
                            "Desplegué la aplicación en infraestructura AWS",
                        ],
                        tech: ["Next.js", "TypeScript", "Tailwind CSS", "AWS", "Wompi"],
                        liveUrl: "https://pay.coins-colombia.com",
                        order: 3,
                    },
                ],
            },
            education: {
                create: [
                    {
                        institution: "Institución Universitaria ITM",
                        degree: "Tecnología",
                        field: "Desarrollo de Software",
                        startDate: "Febrero 2022",
                        endDate: "Octubre 2025",
                        description:
                            "Informática, comunicaciones y servicios de asistencia",
                        order: 0,
                    },
                    // Certificaciones como entradas de educación
                    {
                        institution: "Microsoft",
                        degree: "Certificación",
                        field: "Azure Fundamentals",
                        startDate: "Octubre 2025",
                        endDate: null,
                        description: "Microsoft Certified: Azure Fundamentals (AZ-900)",
                        order: 1,
                    },
                    {
                        institution: "Curso en Línea",
                        degree: "Certificación",
                        field: "Kotlin para Android",
                        startDate: "Agosto 2023",
                        endDate: null,
                        description: "Kotlin Avanzado e Intermediate Kotlin for Android Developers",
                        order: 2,
                    },
                ],
            },
        },
    });

    console.log(`✓ Created Spanish resume (ID: ${esResume.id})`);

    console.log("\n✅ Database seeded successfully!");
    console.log("\nYou can now test the API:");
    console.log("  - English: GET /api/resume?locale=en");
    console.log("  - Spanish: GET /api/resume?locale=es");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("❌ Seed failed:", e);
        await prisma.$disconnect();
        process.exit(1);
    });
