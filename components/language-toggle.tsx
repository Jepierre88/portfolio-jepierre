"use client"

import * as React from "react"

import { LanguagesIcon } from "lucide-react"

import { useTranslation } from "react-i18next"

import { type Locale, supportedLocales } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const locale = ((i18n.resolvedLanguage || i18n.language) as Locale) ?? "en"
  const shortLabel = (locale === "es" ? "ES" : "EN")

  const setLocale = React.useCallback(
    async (next: Locale) => {
      const safe: Locale = supportedLocales.includes(next) ? next : "en"
      await i18n.changeLanguage(safe)
    },
    [i18n]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Toggle language"
          className="gap-2"
        >
          <LanguagesIcon className="size-4" />
          <span className="text-xs font-medium tracking-wide">{shortLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onSelect={() => setLocale("en")}
          className="flex items-center justify-between"
        >
          <span>English</span>
          {locale === "en" ? <span aria-hidden="true">✓</span> : <span />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setLocale("es")}
          className="flex items-center justify-between"
        >
          <span>Español</span>
          {locale === "es" ? <span aria-hidden="true">✓</span> : <span />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
