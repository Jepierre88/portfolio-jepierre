"use client"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "@/content/locale/en.json"
import es from "@/content/locale/es.json"

export type Locale = "en" | "es"
export const supportedLocales: Locale[] = ["en", "es"]

const STORAGE_KEY = "portfolio.locale"

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        es: { translation: es },
      },
      fallbackLng: "en",
      supportedLngs: supportedLocales,
      load: "languageOnly",
      nonExplicitSupportedLngs: true,
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: STORAGE_KEY,
      },
    })
}

export { i18n }

