"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoaderIcon } from "lucide-react";

function ShimmerLine({ className }: { className?: string }) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-md bg-muted/60 dark:bg-muted/40 " +
        (className ?? "")
      }
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_linear_infinite] bg-linear-to-r from-transparent via-white/35 to-transparent dark:via-white/10" />
    </div>
  );
}

export function PortfolioLoader() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 opacity-70 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-purple-500/10" />
      </div>

      <Card className="w-[min(560px,92vw)] animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg font-semibold tracking-tight">
              <AnimatedShinyText className="text-primary" shimmerWidth={120}>
                {t("loading") || (locale === "es" ? "Cargando…" : "Loading…")}
              </AnimatedShinyText>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={locale === "en" ? "default" : "secondary"}>EN</Badge>
              <Badge variant={locale === "es" ? "default" : "secondary"}>ES</Badge>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            {locale === "es"
              ? "Sincronizando contenido desde la base de datos…"
              : "Syncing content from the database…"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <LoaderIcon className="text-muted-foreground size-4 animate-spin" />
            <div className="text-muted-foreground text-xs">
              {locale === "es" ? "Preparando la experiencia" : "Preparing experience"}
            </div>
          </div>

          {/* fake skeleton */}
          <div className="space-y-3">
            <ShimmerLine className="h-3 w-3/5" />
            <ShimmerLine className="h-3 w-11/12" />
            <ShimmerLine className="h-3 w-10/12" />
            <div className="grid grid-cols-3 gap-3 pt-2">
              <ShimmerLine className="h-10" />
              <ShimmerLine className="h-10" />
              <ShimmerLine className="h-10" />
            </div>
          </div>

          <div className="text-muted-foreground text-[11px]">
            {locale === "es"
              ? "Tip: cambia el idioma cuando termine de cargar."
              : "Tip: switch language after it finishes loading."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
