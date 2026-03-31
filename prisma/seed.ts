import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { config } from "dotenv";

config({ path: ".env.local" });

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

    // ═══════════════════════════════════════════
    // ENGLISH RESUME
    // ═══════════════════════════════════════════
    const enResume = await prisma.resume.create({
        data: {
            locale: "en",
            isActive: true,
            person: {
                create: {
                    fullName: "Jean Ortiz",
                    role: "Full-Stack Developer",
                    location: "Sabaneta, Antioquia, Colombia",
                    email: "jeanpi.22241@gmail.com",
                    phone: "+57 3234409350",
                    website: "https://jepierre-dev.vercel.app",
                    github: "https://github.com/Jepierre88",
                    linkedin: "https://www.linkedin.com/in/jepierre89",
                    availabilityLabel: "Open to opportunities",
                    shortBio:
                        "Full-stack developer with a strong frontend focus, passionate about building digital products that solve real business problems. Co-founder of ChronoSoft, where I lead a team of developers creating software solutions for parking management and point-of-sale systems. I believe in clean code, great user experiences, and technology that creates real impact.",
                    about: [
                        "Full-stack developer with a strong frontend focus, experienced in building and shipping real-world products across parking systems, fintech payments, mining operations, and e-commerce.",
                        "Co-founder and lead developer at ChronoSoft, a software company where I work alongside a team of developers to build innovative solutions for business operations management.",
                        "My work centers on creating scalable, maintainable architectures using modern frameworks like React, Next.js, and Angular, with a strong emphasis on performance and user experience.",
                        "Always looking for challenging projects where I can contribute with creativity, technical skills, and an entrepreneurial mindset.",
                    ],
                },
            },
            highlights: {
                create: [
                    {
                        label: "Years",
                        value: "2+",
                        hint: "Professional experience",
                        order: 0,
                    },
                    {
                        label: "Projects",
                        value: "6+",
                        hint: "Shipped to production",
                        order: 1,
                    },
                    {
                        label: "Focus",
                        value: "Frontend",
                        hint: "React, Next.js, Angular",
                        order: 2,
                    },
                    {
                        label: "Founder",
                        value: "ChronoSoft",
                        hint: "Tech Entrepreneur",
                        order: 3,
                    },
                ],
            },
            // ─── Skills ───
            // "Core skills" (primary)   → What I use daily — strongest technologies
            // "Also strong at" (secondary) → Solid proficiency, used regularly
            // "Tooling" (tooling)        → Infrastructure, deployment & dev tools
            skills: {
                create: [
                    // ── Core skills (primary) — Frontend-first, then backend frameworks ──
                    { name: "React", category: "primary", order: 0 },
                    { name: "Next.js", category: "primary", order: 1 },
                    { name: "Angular", category: "primary", order: 2 },
                    { name: "TypeScript", category: "primary", order: 3 },
                    { name: "NestJS", category: "primary", order: 4 },
                    { name: "Node.js", category: "primary", order: 5 },
                    { name: "Express.js", category: "primary", order: 6 },
                    { name: "Tailwind CSS", category: "primary", order: 7 },
                    // ── Also strong at (secondary) — Backend languages, DBs, APIs ──
                    { name: "Java", category: "secondary", order: 0 },
                    { name: "Spring Boot", category: "secondary", order: 1 },
                    { name: "PostgreSQL", category: "secondary", order: 2 },
                    { name: "MySQL", category: "secondary", order: 3 },
                    { name: "REST APIs", category: "secondary", order: 4 },
                    // ── Tooling — Cloud, containers & deployment platforms ──
                    { name: "Git", category: "tooling", order: 0 },
                    { name: "Docker", category: "tooling", order: 1 },
                    { name: "AWS", category: "tooling", order: 2 },
                    { name: "Azure", category: "tooling", order: 3 },
                    { name: "Vercel", category: "tooling", order: 4 },
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
                            "Worked as part of a cross-functional engineering team focused on digital transformation within the mining sector, improving manual processes, gold processing traceability, and internal automation systems.",
                        bullets: [
                            "Developed internal web and mobile tools to replace manual workflows, saving operations teams several hours per week",
                            "Built user interfaces to support end-to-end traceability of gold processing, improving data visibility and operational control",
                            "Implemented secure authentication flows and role-based access control for internal systems used by multiple departments",
                            "Contributed to the automation of operational and reporting processes across mining operations",
                            "Integrated frontend applications with backend services, third-party APIs, and webhooks for real-time data synchronization",
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
                        title: "Full-Stack Developer",
                        location: "Medellín, Antioquia, Colombia",
                        startDate: "April 2024",
                        endDate: "June 2025",
                        summary:
                            "Led UI architecture and delivered end-to-end product features for a parking management and electronic device automation platform, building interfaces integrated with real-time hardware and operational systems.",
                        bullets: [
                            "Owned the rollout of a design system for parking operation and admin applications, improving UI consistency and usability",
                            "Built and maintained frontend interfaces using Next.js and React integrated with backend systems connected to electronic devices and sensors",
                            "Integrated payment systems using Wompi for parking environments",
                            "Improved application performance by optimizing rendering and assets, reducing load times for operational dashboards",
                            "Worked with LoopBack and NestJS for backend development, deployed applications on AWS infrastructure",
                        ],
                        tech: [
                            "Next.js",
                            "React",
                            "TypeScript",
                            "Tailwind CSS",
                            "Node.js",
                            "NestJS",
                            "LoopBack",
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
                        slug: "chrono-parking",
                        name: "ChronoParking",
                        summary:
                            "Comprehensive parking management platform with payments, sessions, and DIAN reporting — built by ChronoSoft.",
                        description:
                            "ChronoParking is a full-featured parking management platform developed by ChronoSoft, the software company I co-founded with a team of developers. The platform handles parking session management, online and on-site payment processing, real-time occupancy tracking, and automated reporting to the DIAN (Colombian tax authority). Upcoming features include vehicle wash services and additional value-added services for parking facilities.",
                        role: "Co-founder & Lead Developer",
                        highlights: [
                            "Co-founded ChronoSoft and led the development of the flagship parking management product",
                            "Designed and built the full-stack architecture handling session management, payments, and real-time tracking",
                            "Implemented payment processing integrations for both online and on-site transactions",
                            "Built automated DIAN tax reporting modules for regulatory compliance",
                            "Planning expansion into vehicle wash services and additional parking facility services",
                        ],
                        tech: [
                            "Next.js",
                            "React",
                            "NestJS",
                            "Node.js",
                            "TypeScript",
                            "PostgreSQL",
                            "Docker",
                        ],
                        liveUrl: null,
                        order: 0,
                    },
                    {
                        slug: "chrono-pos",
                        name: "Chrono POS",
                        summary:
                            "Point-of-sale system for retail environments — a ChronoSoft product.",
                        description:
                            "Chrono POS is a comprehensive POS solution developed under ChronoSoft, designed to simplify and accelerate sales transactions while providing real-time inventory tracking and reporting. The system supports cashier workflows, payment processing, and stock management, helping retail businesses improve efficiency and accuracy in daily operations.",
                        role: "Co-founder & Frontend Developer",
                        highlights: [
                            "Built intuitive user interfaces for sales and inventory management",
                            "Implemented real-time inventory tracking and reporting dashboards",
                            "Integrated payment gateways for secure transaction processing",
                        ],
                        tech: [
                            "Angular",
                            "NestJS",
                            "TypeScript",
                            "PostgreSQL",
                        ],
                        liveUrl: "https://pos.chronosoft.com.co",
                        order: 1,
                    },
                    {
                        slug: "glow-zuly",
                        name: "GLOW ZULY",
                        summary:
                            "E-commerce platform for modern online shopping experiences.",
                        description:
                            "GLOW ZULY is an e-commerce platform designed for modern online shopping experiences. The project focuses on creating a scalable and user-friendly shopping platform with a clean UI and fast performance.",
                        role: "Full-Stack Developer",
                        highlights: [
                            "Building a complete e-commerce solution from scratch",
                            "Implementing modern UI/UX patterns for seamless shopping experiences",
                            "Setting up scalable infrastructure on Vercel",
                        ],
                        tech: [
                            "Next.js",
                            "TypeScript",
                            "Tailwind CSS",
                            "Vercel",
                        ],
                        liveUrl: "https://glow-zuly.vercel.app",
                        order: 2,
                    },
                    {
                        slug: "coins-pay",
                        name: "Coins Pay",
                        summary:
                            "Web-based payment gateway for secure parking session payments across multiple facilities.",
                        description:
                            "Coins Pay is a parking-focused payment platform that allows users to pay for parking sessions across different locations. The application integrates with Wompi as the payment provider to securely connect with banking systems. Built with Next.js and deployed on AWS, the platform emphasizes performance, reliability, and a smooth mobile-first payment experience.",
                        role: "Frontend Developer & Deployments",
                        highlights: [
                            "Developed the complete frontend experience for parking session payments using Next.js",
                            "Built responsive and accessible user interfaces optimized for mobile-first payment flows",
                            "Handled application deployments and environment configuration on AWS",
                            "Collaborated with backend and product teams to ensure reliable payment flows",
                        ],
                        tech: [
                            "Next.js",
                            "TypeScript",
                            "Tailwind CSS",
                            "AWS",
                        ],
                        liveUrl: "https://pay.coins-colombia.com",
                        order: 3,
                    },
                    {
                        slug: "aurum-suite",
                        name: "Aurum Suite",
                        summary:
                            "SaaS mining management platform for tracking gold processing operations across multiple sites.",
                        description:
                            "Aurum Suite is a mining-focused SaaS application designed to digitize and centralize operational data across the gold production lifecycle. The platform supports laboratory processes, weighing and scale operations, plant activities, and multi-site tracking, enabling improved traceability and operational visibility.",
                        role: "Frontend Developer",
                        highlights: [
                            "Built and maintained a web-based mining management platform using Angular",
                            "Developed user interfaces for laboratory workflows, weighing systems, and plant operations",
                            "Improved traceability and data consistency for gold processing across multiple sites",
                            "Collaborated with cross-functional teams to modernize manual mining processes",
                        ],
                        tech: ["Angular", "TypeScript", "Node.js"],
                        liveUrl: "https://aurumsuite.com.co",
                        order: 4,
                    },
                ],
            },
            education: {
                create: [
                    {
                        institution: "Instituto Tecnológico Metropolitano - ITM",
                        degree: "Systems Engineering",
                        field: "Systems Engineering",
                        startDate: "January 2026",
                        endDate: null,
                        description:
                            "Currently pursuing a Systems Engineering degree",
                        order: 0,
                    },
                    {
                        institution: "Instituto Tecnológico Metropolitano - ITM",
                        degree: "Technology Degree",
                        field: "Software Development",
                        startDate: "February 2022",
                        endDate: "October 2025",
                        description:
                            "Software Development Technology — Information Technology, Communications, and Support Services",
                        order: 1,
                    },
                    {
                        institution: "Microsoft",
                        degree: "Certification",
                        field: "Azure Fundamentals",
                        startDate: "October 2025",
                        endDate: null,
                        description:
                            "Microsoft Certified: Azure Fundamentals (AZ-900)",
                        order: 2,
                    },
                    {
                        institution: "Online Course",
                        degree: "Certification",
                        field: "Kotlin for Android",
                        startDate: "August 2023",
                        endDate: null,
                        description:
                            "Advanced Kotlin and Intermediate Kotlin for Android Developers",
                        order: 3,
                    },
                ],
            },
        },
    });

    console.log(`✓ Created English resume (ID: ${enResume.id})`);

    // ═══════════════════════════════════════════
    // SPANISH RESUME
    // ═══════════════════════════════════════════
    const esResume = await prisma.resume.create({
        data: {
            locale: "es",
            isActive: true,
            person: {
                create: {
                    fullName: "Jean Ortiz",
                    role: "Desarrollador Full-Stack",
                    location: "Sabaneta, Antioquia, Colombia",
                    email: "jeanpi.22241@gmail.com",
                    phone: "+57 3234409350",
                    website: "https://jepierre-dev.vercel.app",
                    github: "https://github.com/Jepierre88",
                    linkedin: "https://www.linkedin.com/in/jepierre89",
                    availabilityLabel: "Abierto a oportunidades",
                    shortBio:
                        "Desarrollador full-stack con enfoque en frontend, apasionado por construir productos digitales que resuelvan problemas reales de negocio. Co-fundador de ChronoSoft, donde lidero un equipo de desarrolladores creando soluciones de software para gestión de parqueaderos y sistemas punto de venta. Creo en el código limpio, la gran experiencia de usuario y la tecnología que genera impacto real.",
                    about: [
                        "Desarrollador full-stack con fuerte enfoque frontend, con experiencia construyendo y lanzando productos reales en sistemas de parqueaderos, pagos fintech, operaciones mineras y e-commerce.",
                        "Co-fundador y desarrollador líder en ChronoSoft, una empresa de software donde trabajo junto a un equipo de desarrolladores construyendo soluciones innovadoras para la gestión de operaciones empresariales.",
                        "Mi trabajo se centra en crear arquitecturas escalables y mantenibles usando frameworks modernos como React, Next.js y Angular, con fuerte énfasis en rendimiento y experiencia de usuario.",
                        "Siempre en busca de proyectos desafiantes donde pueda contribuir con creatividad, habilidades técnicas y visión emprendedora.",
                    ],
                },
            },
            highlights: {
                create: [
                    {
                        label: "Años",
                        value: "2+",
                        hint: "Experiencia profesional",
                        order: 0,
                    },
                    {
                        label: "Proyectos",
                        value: "6+",
                        hint: "En producción",
                        order: 1,
                    },
                    {
                        label: "Enfoque",
                        value: "Frontend",
                        hint: "React, Next.js, Angular",
                        order: 2,
                    },
                    {
                        label: "Fundador",
                        value: "ChronoSoft",
                        hint: "Emprendedor Tech",
                        order: 3,
                    },
                ],
            },
            // ─── Skills ───
            // "Habilidades clave" (primary)  → Lo que uso a diario
            // "También fuerte en" (secondary) → Buen nivel, uso regular
            // "Herramientas" (tooling)        → Infraestructura, despliegue y herramientas
            skills: {
                create: [
                    // ── Habilidades clave (primary) — Frontend primero, luego backend ──
                    { name: "React", category: "primary", order: 0 },
                    { name: "Next.js", category: "primary", order: 1 },
                    { name: "Angular", category: "primary", order: 2 },
                    { name: "TypeScript", category: "primary", order: 3 },
                    { name: "NestJS", category: "primary", order: 4 },
                    { name: "Node.js", category: "primary", order: 5 },
                    { name: "Express.js", category: "primary", order: 6 },
                    { name: "Tailwind CSS", category: "primary", order: 7 },
                    // ── También fuerte en (secondary) — Lenguajes backend, DBs, APIs ──
                    { name: "Java", category: "secondary", order: 0 },
                    { name: "Spring Boot", category: "secondary", order: 1 },
                    { name: "PostgreSQL", category: "secondary", order: 2 },
                    { name: "MySQL", category: "secondary", order: 3 },
                    { name: "APIs REST", category: "secondary", order: 4 },
                    // ── Herramientas — Cloud, contenedores y plataformas ──
                    { name: "Git", category: "tooling", order: 0 },
                    { name: "Docker", category: "tooling", order: 1 },
                    { name: "AWS", category: "tooling", order: 2 },
                    { name: "Azure", category: "tooling", order: 3 },
                    { name: "Vercel", category: "tooling", order: 4 },
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
                            "Trabajé como parte de un equipo de ingeniería multifuncional enfocado en la transformación digital del sector minero, mejorando procesos manuales, la trazabilidad del procesamiento de oro y sistemas internos de automatización.",
                        bullets: [
                            "Desarrollé herramientas internas web y móviles para reemplazar flujos manuales, ahorrando varias horas por semana a los equipos operativos",
                            "Construí interfaces para soportar la trazabilidad end-to-end del procesamiento de oro, mejorando la visibilidad de datos y el control operativo",
                            "Implementé flujos de autenticación segura y control de acceso basado en roles para sistemas internos usados por múltiples áreas",
                            "Contribuí a la automatización de procesos operativos y de reporting en operaciones mineras",
                            "Integré aplicaciones frontend con servicios backend, APIs de terceros y webhooks para sincronización de datos en tiempo real",
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
                        title: "Desarrollador Full-Stack",
                        location: "Medellín, Antioquia, Colombia",
                        startDate: "Abril 2024",
                        endDate: "Junio 2025",
                        summary:
                            "Lideré la arquitectura de UI y entregué features end-to-end para una plataforma de gestión de parqueaderos y automatización de dispositivos electrónicos, con interfaces integradas a hardware en tiempo real y sistemas operativos.",
                        bullets: [
                            "Lideré el despliegue de un design system para aplicaciones operativas y de administración, mejorando consistencia y usabilidad",
                            "Construí y mantuve interfaces frontend usando Next.js y React integradas con sistemas backend conectados a dispositivos electrónicos y sensores",
                            "Integré sistemas de pago usando Wompi para entornos de parqueaderos",
                            "Mejoré el rendimiento optimizando renderizado y assets, reduciendo tiempos de carga en dashboards operativos",
                            "Trabajé con LoopBack y NestJS para desarrollo backend, desplegué aplicaciones en infraestructura AWS",
                        ],
                        tech: [
                            "Next.js",
                            "React",
                            "TypeScript",
                            "Tailwind CSS",
                            "Node.js",
                            "NestJS",
                            "LoopBack",
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
                        slug: "chrono-parking",
                        name: "ChronoParking",
                        summary:
                            "Plataforma integral de gestión de parqueaderos con pagos, sesiones y reporte a la DIAN — desarrollada por ChronoSoft.",
                        description:
                            "ChronoParking es una plataforma completa de gestión de parqueaderos desarrollada por ChronoSoft, la empresa de software que co-fundé junto a un equipo de desarrolladores. La plataforma maneja gestión de sesiones de parqueo, procesamiento de pagos online y presenciales, seguimiento de ocupación en tiempo real y reporte automatizado a la DIAN. Próximamente incluirá servicios de lavadero de vehículos y servicios adicionales de valor agregado para parqueaderos.",
                        role: "Co-fundador & Desarrollador Líder",
                        highlights: [
                            "Co-fundé ChronoSoft y lideré el desarrollo del producto principal de gestión de parqueaderos",
                            "Diseñé y construí la arquitectura full-stack para gestión de sesiones, pagos y seguimiento en tiempo real",
                            "Implementé integraciones de procesamiento de pagos para transacciones online y presenciales",
                            "Construí módulos de reporte automatizado a la DIAN para cumplimiento regulatorio",
                            "Planeando expansión a servicios de lavadero de vehículos y servicios adicionales",
                        ],
                        tech: [
                            "Next.js",
                            "React",
                            "NestJS",
                            "Node.js",
                            "TypeScript",
                            "PostgreSQL",
                            "Docker",
                        ],
                        liveUrl: null,
                        order: 0,
                    },
                    {
                        slug: "chrono-pos",
                        name: "Chrono POS",
                        summary:
                            "Sistema punto de venta para entornos retail — un producto de ChronoSoft.",
                        description:
                            "Chrono POS es una solución POS integral desarrollada bajo ChronoSoft, diseñada para simplificar y acelerar transacciones de venta, ofreciendo seguimiento de inventario y reportes en tiempo real. El sistema soporta flujos de caja, procesamiento de pagos y gestión de stock, ayudando a negocios retail a mejorar eficiencia y precisión en la operación diaria.",
                        role: "Co-fundador & Desarrollador Frontend",
                        highlights: [
                            "Construí interfaces intuitivas para ventas y gestión de inventario",
                            "Implementé seguimiento de inventario en tiempo real y dashboards de reportes",
                            "Integré pasarelas de pago para procesamiento seguro de transacciones",
                        ],
                        tech: [
                            "Angular",
                            "NestJS",
                            "TypeScript",
                            "PostgreSQL",
                        ],
                        liveUrl: "https://pos.chronosoft.com.co",
                        order: 1,
                    },
                    {
                        slug: "glow-zuly",
                        name: "GLOW ZULY",
                        summary:
                            "Plataforma de e-commerce para experiencias de compra en línea modernas.",
                        description:
                            "GLOW ZULY es una plataforma de comercio electrónico diseñada para experiencias de compra en línea modernas. El proyecto se enfoca en crear una plataforma escalable y fácil de usar con una UI limpia y alto rendimiento.",
                        role: "Desarrollador Full-Stack",
                        highlights: [
                            "Construyendo una solución de e-commerce completa desde cero",
                            "Implementando patrones modernos de UI/UX para experiencias de compra fluidas",
                            "Configurando infraestructura escalable en Vercel",
                        ],
                        tech: [
                            "Next.js",
                            "TypeScript",
                            "Tailwind CSS",
                            "Vercel",
                        ],
                        liveUrl: "https://glow-zuly.vercel.app",
                        order: 2,
                    },
                    {
                        slug: "coins-pay",
                        name: "Coins Pay",
                        summary:
                            "Gateway de pagos web para pago seguro de sesiones de parqueo en múltiples parqueaderos.",
                        description:
                            "Coins Pay es una plataforma de pagos enfocada en parqueaderos que permite a los usuarios pagar sesiones de parqueo en diferentes ubicaciones. La aplicación se integra con Wompi como proveedor de pagos para conectarse de forma segura con sistemas bancarios. Construida con Next.js y desplegada en AWS, enfatiza rendimiento, confiabilidad y una experiencia de pago mobile-first.",
                        role: "Desarrollador Frontend y Despliegues",
                        highlights: [
                            "Desarrollé la experiencia completa de frontend para pagos de sesiones de parqueo usando Next.js",
                            "Construí interfaces responsivas y accesibles optimizadas para flujos de pago mobile-first",
                            "Gestioné despliegues y configuración de ambientes en AWS",
                            "Colaboré con backend y producto para asegurar flujos de pago confiables",
                        ],
                        tech: [
                            "Next.js",
                            "TypeScript",
                            "Tailwind CSS",
                            "AWS",
                        ],
                        liveUrl: "https://pay.coins-colombia.com",
                        order: 3,
                    },
                    {
                        slug: "aurum-suite",
                        name: "Aurum Suite",
                        summary:
                            "Plataforma SaaS de gestión minera para seguimiento del procesamiento de oro en múltiples sitios.",
                        description:
                            "Aurum Suite es una aplicación SaaS enfocada en minería diseñada para digitalizar y centralizar datos operativos a lo largo del ciclo de producción de oro. La plataforma soporta procesos de laboratorio, pesaje y básculas, actividades de planta y tracking multi-sitio, habilitando mejor trazabilidad y visibilidad operativa.",
                        role: "Desarrollador Frontend",
                        highlights: [
                            "Construí y mantuve una plataforma web de gestión minera usando Angular",
                            "Desarrollé interfaces para flujos de laboratorio, pesaje/básculas y operaciones de planta",
                            "Mejoré la trazabilidad y consistencia de datos del procesamiento de oro entre múltiples sitios",
                            "Colaboré con equipos multifuncionales para modernizar procesos mineros manuales",
                        ],
                        tech: ["Angular", "TypeScript", "Node.js"],
                        liveUrl: "https://aurumsuite.com.co",
                        order: 4,
                    },
                ],
            },
            education: {
                create: [
                    {
                        institution: "Instituto Tecnológico Metropolitano - ITM",
                        degree: "Ingeniería",
                        field: "Ingeniería en Sistemas",
                        startDate: "Enero 2026",
                        endDate: null,
                        description:
                            "Actualmente cursando Ingeniería en Sistemas",
                        order: 0,
                    },
                    {
                        institution: "Instituto Tecnológico Metropolitano - ITM",
                        degree: "Tecnología",
                        field: "Desarrollo de Software",
                        startDate: "Febrero 2022",
                        endDate: "Octubre 2025",
                        description:
                            "Tecnología en Desarrollo de Software — Informática, comunicaciones y servicios de asistencia",
                        order: 1,
                    },
                    {
                        institution: "Microsoft",
                        degree: "Certificación",
                        field: "Azure Fundamentals",
                        startDate: "Octubre 2025",
                        endDate: null,
                        description:
                            "Microsoft Certified: Azure Fundamentals (AZ-900)",
                        order: 2,
                    },
                    {
                        institution: "Curso en Línea",
                        degree: "Certificación",
                        field: "Kotlin para Android",
                        startDate: "Agosto 2023",
                        endDate: null,
                        description:
                            "Kotlin Avanzado e Intermediate Kotlin for Android Developers",
                        order: 3,
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
