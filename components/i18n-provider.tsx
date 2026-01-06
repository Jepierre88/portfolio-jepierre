"use client"

import * as React from "react"

import { I18nextProvider } from "react-i18next"

import { i18n } from "@/lib/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [, forceRender] = React.useReducer((x) => x + 1, 0)

  React.useEffect(() => {
    const syncLang = (lng?: string) => {
      document.documentElement.lang = lng || i18n.resolvedLanguage || i18n.language
      forceRender()
    }

    syncLang(i18n.resolvedLanguage)
    i18n.on("languageChanged", syncLang)
    return () => {
      i18n.off("languageChanged", syncLang)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
