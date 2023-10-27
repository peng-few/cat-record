import "./globals.css"
import type { Metadata } from "next"
import { PageProps } from "./_types"
import { WebSite, WithContext } from "schema-dts"
import { Analytics } from '@vercel/analytics/react';
import { Host } from "./_consts/Host";

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: Host,
}
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const description =
    "了解貓咪的各種主食罐/副食罐/乾飼料營養成份，尋找適合自己貓咪的食物。還可以紀錄每日貓咪的飲食狀況"
  return {
    metadataBase: new URL(Host ?? ''),
    title: {
      template: "%s | 喵喵紀錄",
      default: "喵喵紀錄",
    },
    openGraph: {
      title: "喵喵紀錄",
      description,
      url: Host,
      siteName: "喵喵紀錄",
      locale: "zh_TW",
      type: "website",
    },
    description,
    alternates: { canonical: Host },
  }
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="zh-tw">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
