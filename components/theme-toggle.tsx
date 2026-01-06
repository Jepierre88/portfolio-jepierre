"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // Avoid hydration mismatch for icon selection
  const current = mounted ? theme : "system"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("theme.toggleLabel")}>
          {current === "dark" ? (
            <MoonIcon className="size-4" />
          ) : current === "light" ? (
            <SunIcon className="size-4" />
          ) : (
            <MonitorIcon className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onSelect={() => setTheme("light")}>
          {t("theme.light")}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>{t("theme.dark")}</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")}>
          {t("theme.system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
