"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import type { PortfolioWithEducation } from "@/lib/resume";

type UsePortfolioDataResult = {
    portfolio: PortfolioWithEducation | null;
    isLoading: boolean;
    error: string | null;
    locale: string;
};

/**
 * Hook to fetch portfolio data from the database based on current locale.
 * Falls back to provided initial data if fetch fails.
 */
export function usePortfolioData(
    initialData?: PortfolioWithEducation | null
): UsePortfolioDataResult {
    const { i18n } = useTranslation();
    const locale = i18n.language?.split("-")[0] || "en"; // Get base locale (en, es)

    const [portfolio, setPortfolio] =
        React.useState<PortfolioWithEducation | null>(initialData ?? null);
    const [isLoading, setIsLoading] = React.useState(!initialData);
    const [error, setError] = React.useState<string | null>(null);
    const [currentLocale, setCurrentLocale] = React.useState(locale);

    React.useEffect(() => {
        // Only fetch if locale changed or we don't have data
        if (locale === currentLocale && portfolio) {
            return;
        }

        const fetchPortfolio = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/portfolio?locale=${locale}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch portfolio");
                }

                const data = await response.json();
                setPortfolio(data.portfolio);
                setCurrentLocale(locale);
            } catch (err) {
                console.error("Error fetching portfolio:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
                // Keep existing data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolio();
    }, [locale, currentLocale, portfolio]);

    return {
        portfolio,
        isLoading,
        error,
        locale: currentLocale,
    };
}
