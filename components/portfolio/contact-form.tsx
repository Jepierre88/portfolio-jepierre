"use client"

import * as React from "react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const { t } = useTranslation()
  const [name, setName] = React.useState("")
  const [replyEmail, setReplyEmail] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [status, setStatus] = React.useState<
    | { state: "idle" }
    | { state: "sending" }
    | { state: "sent" }
    | { state: "error"; message: string }
  >({ state: "idle" })

  return (
    <form
      className="grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault()
        if (status.state === "sending") return

        setStatus({ state: "sending" })

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email: replyEmail,
              subject,
              message,
            }),
          })

          if (!res.ok) {
            const data = (await res.json().catch(() => null)) as
              | { error?: string }
              | null
            throw new Error(data?.error || "Failed to send")
          }

          setStatus({ state: "sent" })
          setName("")
          setReplyEmail("")
          setSubject("")
          setMessage("")
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Failed to send"
          setStatus({ state: "error", message: msg })
        }
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">{t("form.name")}</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder={t("form.namePlaceholder")}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="replyEmail">{t("form.email")}</Label>
        <Input
          id="replyEmail"
          value={replyEmail}
          onChange={(e) => setReplyEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
          placeholder={t("form.emailPlaceholder")}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">{t("form.subject")}</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t("form.subjectPlaceholder")}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">{t("form.message")}</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("form.messagePlaceholder")}
          rows={6}
          required
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" disabled={status.state === "sending"}>
          {status.state === "sending" ? t("form.sending") : t("form.send")}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setName("")
            setReplyEmail("")
            setSubject("")
            setMessage("")
            setStatus({ state: "idle" })
          }}
        >
          {t("form.clear")}
        </Button>
        {status.state === "sent" ? (
          <span className="text-muted-foreground text-sm">
            {t("form.sent")}
          </span>
        ) : status.state === "error" ? (
          <span className="text-destructive text-sm">{status.message}</span>
        ) : null}
      </div>
    </form>
  )
}
