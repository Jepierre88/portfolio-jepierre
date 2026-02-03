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
                    role: "Full-Stack Developer",
                    location: "Medellín, Colombia",
                    email: "jepierre.dev@hotmail.com",
                    phone: null,
                    website: "https://jepierre-dev.vercel.app",
                    github: "https://github.com/Jepierre88",
                    linkedin: "https://www.linkedin.com/in/jepierre89",
                    availabilityLabel: "Open to opportunities",
                    shortBio:
                        "I build fast, accessible web applications with great UX, working end-to-end from product thinking to pixel-perfect interfaces and reliable deployments.",
                    about: [
                        "I'm a frontend-focused full-stack developer with experience building and shipping real-world products in industries like parking systems, fintech payments, and mining operations.",
                        "My work centers on creating scalable, maintainable UI architectures using modern frameworks, with a strong emphasis on performance, accessibility, and developer experience.",
                        "I've collaborated closely with product, design, and backend teams to replace manual processes with digital systems, improve operational traceability, and deliver measurable impact in complex, domain-heavy environments.",
                        "I'm especially comfortable working on frontend development, system deployments, and integrating applications into production environments used daily by operational teams.",
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
                        value: "10+",
                        hint: "Shipped to production",
                        order: 1,
                    },
                    {
                        label: "Focus",
                        value: "DX + UX",
                        hint: "Clean, scalable frontends",
                        order: 2,
                    },
                    {
                        label: "Main Stack",
                        value: "Next.js",
                        hint: "TypeScript, React, APIs",
                        order: 3,
                    },
                ],
            },
            skills: {
                create: [
                    // Primary skills
                    { name: "TypeScript", category: "primary", order: 0 },
                    { name: "Java", category: "primary", order: 1 },
                    { name: "React", category: "primary", order: 2 },
                    { name: "Next.js", category: "primary", order: 3 },
                    { name: "Node.js", category: "primary", order: 4 },
                    { name: "Spring Boot", category: "primary", order: 5 },
                    { name: "AWS", category: "primary", order: 6 },
                    { name: "Azure", category: "primary", order: 7 },
                    { name: "REST APIs", category: "primary", order: 8 },
                    {
                        name: "Relational Databases (PostgreSQL, MySQL)",
                        category: "primary",
                        order: 9,
                    },
                    { name: "Tailwind CSS", category: "primary", order: 10 },
                    // Secondary skills
                    { name: "Angular", category: "secondary", order: 0 },
                    { name: "Flutter", category: "secondary", order: 1 },
                    { name: "Testing", category: "secondary", order: 2 },
                    { name: "CI/CD", category: "secondary", order: 3 },
                    { name: "Auth", category: "secondary", order: 4 },
                    { name: "Payments", category: "secondary", order: 5 },
                    { name: "Performance", category: "secondary", order: 6 },
                    // Tooling
                    { name: "Git", category: "tooling", order: 0 },
                    { name: "Docker", category: "tooling", order: 1 },
                    { name: "Vercel", category: "tooling", order: 2 },
                    { name: "Storybook", category: "tooling", order: 3 },
                    { name: "Playwright", category: "tooling", order: 4 },
                ],
            },
            experiences: {
                create: [
                    {
                        company: "SunValley Investments",
                        title: "Frontend Developer",
                        location: "Hybrid",
                        startDate: "June 2025",
                        endDate: "Present",
                        summary:
                            "Worked as part of a cross-functional engineering team focused on digital transformation within the mining sector, improving manual processes, gold processing traceability, and internal automation systems.",
                        bullets: [
                            "Developed internal web and mobile tools to replace manual workflows, saving operations teams several hours per week.",
                            "Built user interfaces to support end-to-end traceability of gold processing, improving data visibility and operational control.",
                            "Implemented secure authentication flows and role-based access control for internal systems used by multiple departments.",
                            "Contributed to the automation of operational and reporting processes across mining operations.",
                            "Integrated frontend applications with backend services, third-party APIs, and webhooks to enable real-time data synchronization.",
                        ],
                        tech: [
                            "Angular",
                            "Node.js",
                            "TypeScript",
                            "Flutter",
                            "Azure",
                        ],
                        order: 0,
                    },
                    {
                        company: "Coins Colombia",
                        title: "Full-Stack Developer",
                        location: "On-site",
                        startDate: "April 2024",
                        endDate: "June 2025",
                        summary:
                            "Led UI architecture and delivered end-to-end product features for a parking management and electronic device automation platform, building interfaces tightly integrated with real-time hardware and operational systems.",
                        bullets: [
                            "Owned the rollout of a design system for parking operation and admin applications, improving UI consistency and usability across the platform.",
                            "Improved application performance by optimizing rendering and assets, reducing load times for dashboards used to monitor parking operations and connected devices.",
                            "Partnered closely with product and design to deliver features related to access control, device automation, and real-time monitoring, driving measurable operational impact.",
                            "Built and maintained frontend interfaces integrated with backend systems connected to electronic devices and sensors deployed in parking facilities.",
                        ],
                        tech: [
                            "Next.js",
                            "TypeScript",
                            "Tailwind",
                            "LoopBackJS",
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
                        slug: "coins-pay",
                        name: "Coins Pay",
                        summary:
                            "A web-based payment gateway that enables secure and seamless payment of parking sessions across multiple parking facilities.",
                        description:
                            "Coins Pay is a parking-focused payment platform that allows users to pay for parking sessions across different locations. The application integrates with Wompi as the payment provider to securely connect with banking systems. Built with Next.js and deployed on AWS, the platform emphasizes performance, reliability, and a smooth payment experience for real-world parking operations.",
                        role: "Frontend & Deployments",
                        highlights: [
                            "Developed the complete frontend experience for parking session payments using Next.js.",
                            "Built responsive and accessible user interfaces optimized for mobile-first payment flows.",
                            "Handled application deployments and environment configuration on AWS.",
                            "Collaborated with backend and product teams to ensure reliable payment flows and deployment stability.",
                        ],
                        tech: ["Next.js", "TypeScript", "Tailwind", "AWS"],
                        liveUrl: "https://pay.coins-colombia.com/auth/login",
                        order: 0,
                    },
                    {
                        slug: "aurum-suite",
                        name: "Aurum Suite",
                        summary:
                            "A SaaS mining management platform built to track and manage gold processing operations across multiple sites worldwide.",
                        description:
                            "Aurum Suite is a mining-focused SaaS application designed to digitize and centralize operational data across the gold production lifecycle. The platform supports laboratory processes, weighing and scale operations, plant activities, and multi-site tracking, enabling improved traceability, data accuracy, and operational visibility across global mining locations.",
                        role: "Frontend Developer",
                        highlights: [
                            "Built and maintained a web-based mining management platform using Angular.",
                            "Developed user interfaces for laboratory workflows, weighing systems, plant operations, and process tracking.",
                            "Improved traceability and data consistency for gold processing across multiple operational sites.",
                            "Collaborated with cross-functional teams to modernize manual and fragmented mining processes.",
                            "Prepared the application architecture for upcoming mobile expansion using Flutter.",
                        ],
                        tech: ["Angular", "TypeScript", "Flutter (planned)"],
                        liveUrl: "https://aurumsuite.com.co/#/auth/login",
                        order: 1,
                    },
                ],
            },
            education: {
                create: [
                    {
                        institution: "Universidad de Ejemplo",
                        degree: "Bachelor's Degree",
                        field: "Software Engineering",
                        startDate: "2019",
                        endDate: "2023",
                        description:
                            "Focus on software development, algorithms, and web technologies.",
                        order: 0,
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
                    role: "Desarrollador Full-Stack",
                    location: "Medellín, Colombia",
                    email: "jepierre.dev@hotmail.com",
                    phone: null,
                    website: "https://jepierre-dev.vercel.app",
                    github: "https://github.com/Jepierre88",
                    linkedin: "https://www.linkedin.com/in/jepierre89",
                    availabilityLabel: "Abierto a oportunidades",
                    shortBio:
                        "Construyo aplicaciones web rápidas y accesibles con excelente UX, trabajando de extremo a extremo desde el pensamiento de producto hasta interfaces pixel-perfect y despliegues confiables.",
                    about: [
                        "Soy un desarrollador full-stack enfocado en frontend con experiencia construyendo y entregando productos del mundo real en industrias como sistemas de parqueo, pagos fintech y operaciones mineras.",
                        "Mi trabajo se centra en crear arquitecturas de UI escalables y mantenibles usando frameworks modernos, con un fuerte énfasis en rendimiento, accesibilidad y experiencia del desarrollador.",
                        "He colaborado estrechamente con equipos de producto, diseño y backend para reemplazar procesos manuales con sistemas digitales, mejorar la trazabilidad operacional y entregar impacto medible en entornos complejos.",
                        "Me siento especialmente cómodo trabajando en desarrollo frontend, despliegues de sistemas e integración de aplicaciones en entornos de producción utilizados diariamente por equipos operacionales.",
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
                        value: "10+",
                        hint: "En producción",
                        order: 1,
                    },
                    {
                        label: "Enfoque",
                        value: "DX + UX",
                        hint: "Frontends limpios y escalables",
                        order: 2,
                    },
                    {
                        label: "Stack Principal",
                        value: "Next.js",
                        hint: "TypeScript, React, APIs",
                        order: 3,
                    },
                ],
            },
            skills: {
                create: [
                    // Primary skills
                    { name: "TypeScript", category: "primary", order: 0 },
                    { name: "Java", category: "primary", order: 1 },
                    { name: "React", category: "primary", order: 2 },
                    { name: "Next.js", category: "primary", order: 3 },
                    { name: "Node.js", category: "primary", order: 4 },
                    { name: "Spring Boot", category: "primary", order: 5 },
                    { name: "AWS", category: "primary", order: 6 },
                    { name: "Azure", category: "primary", order: 7 },
                    { name: "REST APIs", category: "primary", order: 8 },
                    {
                        name: "Bases de Datos Relacionales (PostgreSQL, MySQL)",
                        category: "primary",
                        order: 9,
                    },
                    { name: "Tailwind CSS", category: "primary", order: 10 },
                    // Secondary skills
                    { name: "Angular", category: "secondary", order: 0 },
                    { name: "Flutter", category: "secondary", order: 1 },
                    { name: "Testing", category: "secondary", order: 2 },
                    { name: "CI/CD", category: "secondary", order: 3 },
                    { name: "Autenticación", category: "secondary", order: 4 },
                    { name: "Pagos", category: "secondary", order: 5 },
                    { name: "Rendimiento", category: "secondary", order: 6 },
                    // Tooling
                    { name: "Git", category: "tooling", order: 0 },
                    { name: "Docker", category: "tooling", order: 1 },
                    { name: "Vercel", category: "tooling", order: 2 },
                    { name: "Storybook", category: "tooling", order: 3 },
                    { name: "Playwright", category: "tooling", order: 4 },
                ],
            },
            experiences: {
                create: [
                    {
                        company: "SunValley Investments",
                        title: "Desarrollador Frontend",
                        location: "Híbrido",
                        startDate: "Junio 2025",
                        endDate: "Present",
                        summary:
                            "Trabajé como parte de un equipo de ingeniería multifuncional enfocado en la transformación digital dentro del sector minero, mejorando procesos manuales, trazabilidad del procesamiento de oro y sistemas de automatización internos.",
                        bullets: [
                            "Desarrollé herramientas web y móviles internas para reemplazar flujos de trabajo manuales, ahorrando varias horas por semana a los equipos de operaciones.",
                            "Construí interfaces de usuario para soportar trazabilidad de extremo a extremo del procesamiento de oro, mejorando la visibilidad de datos y el control operacional.",
                            "Implementé flujos de autenticación seguros y control de acceso basado en roles para sistemas internos utilizados por múltiples departamentos.",
                            "Contribuí a la automatización de procesos operacionales y de reportes en operaciones mineras.",
                            "Integré aplicaciones frontend con servicios backend, APIs de terceros y webhooks para habilitar sincronización de datos en tiempo real.",
                        ],
                        tech: [
                            "Angular",
                            "Node.js",
                            "TypeScript",
                            "Flutter",
                            "Azure",
                        ],
                        order: 0,
                    },
                    {
                        company: "Coins Colombia",
                        title: "Desarrollador Full-Stack",
                        location: "Presencial",
                        startDate: "Abril 2024",
                        endDate: "Junio 2025",
                        summary:
                            "Lideré la arquitectura de UI y entregué características de producto de extremo a extremo para una plataforma de gestión de parqueo y automatización de dispositivos electrónicos, construyendo interfaces estrechamente integradas con hardware en tiempo real y sistemas operacionales.",
                        bullets: [
                            "Lideré el despliegue de un sistema de diseño para aplicaciones de operación y administración de parqueo, mejorando la consistencia de UI y usabilidad en toda la plataforma.",
                            "Mejoré el rendimiento de aplicaciones optimizando renderizado y assets, reduciendo tiempos de carga para dashboards usados para monitorear operaciones de parqueo y dispositivos conectados.",
                            "Colaboré estrechamente con producto y diseño para entregar características relacionadas con control de acceso, automatización de dispositivos y monitoreo en tiempo real.",
                            "Construí y mantuve interfaces frontend integradas con sistemas backend conectados a dispositivos electrónicos y sensores desplegados en instalaciones de parqueo.",
                        ],
                        tech: [
                            "Next.js",
                            "TypeScript",
                            "Tailwind",
                            "LoopBackJS",
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
                        slug: "coins-pay",
                        name: "Coins Pay",
                        summary:
                            "Una pasarela de pago web que permite el pago seguro y sin fricciones de sesiones de parqueo en múltiples instalaciones.",
                        description:
                            "Coins Pay es una plataforma de pago enfocada en parqueo que permite a los usuarios pagar sesiones de parqueo en diferentes ubicaciones. La aplicación se integra con Wompi como proveedor de pagos para conectar de forma segura con sistemas bancarios. Construida con Next.js y desplegada en AWS, la plataforma enfatiza rendimiento, confiabilidad y una experiencia de pago fluida para operaciones de parqueo del mundo real.",
                        role: "Frontend y Despliegues",
                        highlights: [
                            "Desarrollé la experiencia frontend completa para pagos de sesiones de parqueo usando Next.js.",
                            "Construí interfaces de usuario responsivas y accesibles optimizadas para flujos de pago mobile-first.",
                            "Manejé despliegues de aplicaciones y configuración de entornos en AWS.",
                            "Colaboré con equipos de backend y producto para asegurar flujos de pago confiables y estabilidad de despliegue.",
                        ],
                        tech: ["Next.js", "TypeScript", "Tailwind", "AWS"],
                        liveUrl: "https://pay.coins-colombia.com/auth/login",
                        order: 0,
                    },
                    {
                        slug: "aurum-suite",
                        name: "Aurum Suite",
                        summary:
                            "Una plataforma SaaS de gestión minera construida para rastrear y gestionar operaciones de procesamiento de oro en múltiples sitios a nivel mundial.",
                        description:
                            "Aurum Suite es una aplicación SaaS enfocada en minería diseñada para digitalizar y centralizar datos operacionales a lo largo del ciclo de vida de producción de oro. La plataforma soporta procesos de laboratorio, operaciones de pesaje y balanza, actividades de planta y seguimiento multi-sitio.",
                        role: "Desarrollador Frontend",
                        highlights: [
                            "Construí y mantuve una plataforma web de gestión minera usando Angular.",
                            "Desarrollé interfaces de usuario para flujos de trabajo de laboratorio, sistemas de pesaje, operaciones de planta y seguimiento de procesos.",
                            "Mejoré la trazabilidad y consistencia de datos para procesamiento de oro en múltiples sitios operacionales.",
                            "Colaboré con equipos multifuncionales para modernizar procesos mineros manuales y fragmentados.",
                            "Preparé la arquitectura de la aplicación para expansión móvil próxima usando Flutter.",
                        ],
                        tech: ["Angular", "TypeScript", "Flutter (planeado)"],
                        liveUrl: "https://aurumsuite.com.co/#/auth/login",
                        order: 1,
                    },
                ],
            },
            education: {
                create: [
                    {
                        institution: "Universidad de Ejemplo",
                        degree: "Licenciatura",
                        field: "Ingeniería de Software",
                        startDate: "2019",
                        endDate: "2023",
                        description:
                            "Enfoque en desarrollo de software, algoritmos y tecnologías web.",
                        order: 0,
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
