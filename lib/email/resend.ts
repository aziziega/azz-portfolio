import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API)

const FROM_EMAIL = "onboarding@resend.dev"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
const OWNER_NAME = "Azizi Egatri M."
const OWNER_EMAIL = process.env.ADMIN_ALLOWED_EMAIL || "aziziegatrim@gmail.com"

/**
 * Kirim email konfirmasi Double Opt-in ke subscriber baru.
 * Subscriber perlu klik link di email ini untuk diaktifkan.
 */
export async function sendConfirmationEmail(email: string, token: string) {
  const confirmUrl = `${SITE_URL}/api/newsletter/verify?token=${token}`

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `✅ Please confirm your subscription — ${OWNER_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1e293b 0%,#334155 100%);padding:32px 40px;text-align:center;">
                      <p style="margin:0;font-size:28px;">✉️</p>
                      <h1 style="margin:12px 0 0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                        Confirm Your Subscription
                      </h1>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.6;">
                        Hi there! 👋
                      </p>
                      <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">
                        You recently submitted your email to subscribe to updates from <strong style="color:#1e293b;">${OWNER_NAME}</strong>'s portfolio. 
                        Click the button below to confirm your subscription and get notified about new projects and articles.
                      </p>
                      <!-- CTA Button -->
                      <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
                        <tr>
                          <td style="background:#1e293b;border-radius:10px;">
                            <a href="${confirmUrl}" 
                               style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.2px;">
                              ✅ Confirm Subscription
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;line-height:1.5;text-align:center;">
                        Or copy this link to your browser:
                      </p>
                      <p style="margin:0;color:#64748b;font-size:12px;word-break:break-all;text-align:center;">
                        ${confirmUrl}
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                      <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.5;">
                        If you didn't subscribe, you can safely ignore this email.<br />
                        This link will expire in 24 hours.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  })

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`)
  return data
}

/**
 * Kirim Welcome Email setelah subscriber berhasil konfirmasi.
 */
export async function sendWelcomeEmail(email: string) {
  const portfolioUrl = SITE_URL

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `🎉 Welcome! You're now subscribed — ${OWNER_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1e293b 0%,#334155 100%);padding:32px 40px;text-align:center;">
                      <p style="margin:0;font-size:36px;">🎉</p>
                      <h1 style="margin:12px 0 0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                        You're In!
                      </h1>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.6;">
                        Welcome, and thank you for subscribing! 🙌
                      </p>
                      <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">
                        You're now on the list for <strong style="color:#1e293b;">${OWNER_NAME}</strong>'s portfolio updates. 
                        You'll be the first to know about new projects, articles, and insights on design, development, and product thinking.
                      </p>
                      <!-- What to expect -->
                      <div style="background:#f1f5f9;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
                        <p style="margin:0 0 12px;color:#1e293b;font-size:14px;font-weight:700;">What to expect:</p>
                        <p style="margin:0 0 8px;color:#475569;font-size:14px;line-height:1.5;">🚀 &nbsp;New project showcases</p>
                        <p style="margin:0 0 8px;color:#475569;font-size:14px;line-height:1.5;">✍️ &nbsp;New articles & writings</p>
                        <p style="margin:0;color:#475569;font-size:14px;line-height:1.5;">💡 &nbsp;Design & development insights</p>
                      </div>
                      <!-- CTA -->
                      <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                        <tr>
                          <td style="background:#1e293b;border-radius:10px;">
                            <a href="${portfolioUrl}" 
                               style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                              Visit Portfolio →
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                      <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.5;">
                        ${OWNER_NAME} · Portfolio Newsletter<br />
                        You can unsubscribe at any time by contacting us.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  })

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`)
  return data
}

/**
 * Kirim email broadcast ke banyak email sekaligus menggunakan BCC.
 */
export async function sendBroadcastEmail(emails: string[], subject: string, bodyText: string) {
  // Convert newlines to HTML br tags, and markdown ** to <strong>
  const formattedHtml = bodyText
    .replace(/\r\n/g, "<br />")
    .replace(/\n/g, "<br />")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
    bcc: emails,
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1e293b 0%,#334155 100%);padding:32px 40px;text-align:center;">
                      <p style="margin:0;font-size:28px;">📢</p>
                      <h1 style="margin:12px 0 0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                        Portfolio Update
                      </h1>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px;text-align:left;">
                      <div style="color:#475569;font-size:15px;line-height:1.6;">
                        ${formattedHtml}
                      </div>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                      <p style="margin:0 0 8px;color:#94a3b8;font-size:11px;line-height:1.5;">
                        You received this email because you subscribed to updates from ${OWNER_NAME}'s portfolio.
                      </p>
                      <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;">
                        To unsubscribe, please contact us directly at ${OWNER_EMAIL}.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  })

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`)
  return data
}
