import { NextRequest, NextResponse } from "next/server";
import {
    getActiveResumeByLocale,
    generateResumePdf,
    generateFilename,
} from "@/lib/resume";

// Force Node.js runtime (not Edge) for PDF generation compatibility
export const runtime = "nodejs";

// Force dynamic rendering (not static)
export const dynamic = "force-dynamic";

/**
 * GET /api/resume
 *
 * Generates and returns an ATS-friendly PDF resume from database data.
 *
 * Query params:
 * - locale: "en" | "es" (default: "en")
 * - download: "true" | "false" (default: "true")
 *
 * Headers returned:
 * - Content-Type: application/pdf
 * - Content-Disposition: attachment (if download=true) or inline
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get("locale") || "en";
        const download = searchParams.get("download") !== "false";

        // Validate locale
        if (!["en", "es"].includes(locale)) {
            return NextResponse.json(
                { error: "Invalid locale. Use 'en' or 'es'" },
                { status: 400 }
            );
        }

        // Fetch resume data from database
        const resumeData = await getActiveResumeByLocale(locale);

        if (!resumeData) {
            return NextResponse.json(
                {
                    error: `No active resume found for locale '${locale}'`,
                    hint: "Make sure you have seeded the database with resume data.",
                },
                { status: 404 }
            );
        }

        // Generate PDF
        const pdfBuffer = await generateResumePdf(resumeData);
        const filename = generateFilename(resumeData.person.fullName, locale);

        // Return PDF response
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        headers.set("Content-Length", pdfBuffer.length.toString());
        headers.set(
            "Content-Disposition",
            download
                ? `attachment; filename="${filename}"`
                : `inline; filename="${filename}"`
        );
        headers.set(
            "Cache-Control",
            "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
        );

        return new NextResponse(new Uint8Array(pdfBuffer), {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("Error generating resume PDF:", error);

        return NextResponse.json(
            {
                error: "Failed to generate resume PDF",
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
            },
            { status: 500 }
        );
    }
}
