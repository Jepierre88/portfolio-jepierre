import { NextRequest, NextResponse } from "next/server";
import {
    getActiveResumeByLocale,
    resumeDataToPortfolioWithEducation,
} from "@/lib/resume";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * GET /api/portfolio
 *
 * Returns portfolio data from the database for the UI.
 *
 * Query params:
 * - locale: "en" | "es" (default: "en")
 *
 * This endpoint provides the same data that powers the resume PDF,
 * ensuring consistency between the web UI and downloadable CV.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get("locale") || "en";

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
                    error: `No active portfolio found for locale '${locale}'`,
                    hint: "Make sure you have seeded the database with portfolio data.",
                },
                { status: 404 }
            );
        }

        // Convert to Portfolio format for the UI
        const portfolio = resumeDataToPortfolioWithEducation(resumeData);

        return NextResponse.json({
            locale,
            portfolio,
        });
    } catch (error) {
        console.error("Error fetching portfolio data:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch portfolio data",
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
            },
            { status: 500 }
        );
    }
}
