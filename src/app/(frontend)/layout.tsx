import React from "react"
import type { Metadata } from "next"
import {
  makeSiteSettings,
  sanitizeHtmlAttribute,
} from "@/lib/make-site-settings"
import PrivacyChoices from "./components/PrivacyChoices"
import "./styles.css"

const defaultTitle = "FriendDNA — How well do your friends know you?"
const title = makeSiteSettings.title ?? defaultTitle
const description =
  makeSiteSettings.description ??
  "Create a personal quiz, challenge your friends, and discover who really gets you."
const favicon = makeSiteSettings.icons?.icon
const socialImage = makeSiteSettings.openGraph?.image
const googleAnalyticsId = sanitizeHtmlAttribute(
  makeSiteSettings.analytics?.googleAnalyticsId,
)

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title,
  description,
  robots:
    makeSiteSettings.robots?.index === false
      ? { follow: false, index: false }
      : undefined,
  icons: favicon ? { icon: favicon } : { icon: "/frienddna-logo.png" },
  openGraph: {
    title,
    description,
    images: socialImage ? [socialImage] : undefined,
  },
  twitter: socialImage
    ? {
        card: "summary_large_image",
        images: [socialImage],
      }
    : undefined,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const language = sanitizeHtmlAttribute(makeSiteSettings.language) || "en"
  const addBypassLinks = makeSiteSettings.accessibility?.addBypassLinks === true
  return (
    <html lang={language}>
      <body className="min-h-screen bg-[#05070B] text-[#F5F8FF] antialiased">
        {addBypassLinks && (
          <a className="figma-bypass-link" href="#root">
            Skip to content
          </a>
        )}
        <div id="root" tabIndex={-1}>
          {children}
        </div>
        <PrivacyChoices googleAnalyticsId={googleAnalyticsId} />
      </body>
    </html>
  )
}
