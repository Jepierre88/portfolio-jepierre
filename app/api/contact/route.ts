import nodemailer from "nodemailer"

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message: string
}

function requiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env var: ${name}`)
  return value
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload

    const name = (body.name ?? "").trim()
    const replyTo = (body.email ?? "").trim()
    const subjectRaw = (body.subject ?? "").trim()
    const message = (body.message ?? "").trim()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    // SMTP config
    const host = requiredEnv("SMTP_HOST")
    const port = Number(requiredEnv("SMTP_PORT"))
    const user = requiredEnv("SMTP_USER")
    const pass = requiredEnv("SMTP_PASS")

    // Who receives the message
    const to = requiredEnv("CONTACT_TO")

    // Must be a valid mailbox in your SMTP provider
    const from = process.env.CONTACT_FROM?.trim() || user

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    })

    const subject = subjectRaw || `Portfolio contact${name ? ` from ${name}` : ""}`

    const text = [
      name ? `Name: ${name}` : null,
      replyTo ? `Email: ${replyTo}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n")

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      replyTo: replyTo || undefined,
    })

    return Response.json({ ok: true })
  } catch (err) {
    // Avoid leaking secrets
    const message = err instanceof Error ? err.message : "Unknown error"
    const isMissingEnv = message.startsWith("Missing env var")

    return Response.json(
      { error: isMissingEnv ? message : "Failed to send message" },
      { status: isMissingEnv ? 500 : 500 }
    )
  }
}
