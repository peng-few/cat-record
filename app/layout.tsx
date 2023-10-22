import "./globals.css"
import type { Metadata } from "next"
import { PageProps } from "./_types"
import getUrlOnServer from "@/_lib/getUrlOnServer"
import { WebSite, WithContext } from "schema-dts"

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: process.env.HOST,
}
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const url = getUrlOnServer()
  const description =
    "了解貓咪的各種主食罐/副食罐/乾飼料營養成份，尋找適合自己貓咪的食物。還可以紀錄每日貓咪的飲食狀況"
  return {
    metadataBase: new URL(process.env.VERCEL_URL || process.env.HOST),
    title: {
      template: "%s | 喵喵紀錄",
      default: "喵喵紀錄",
    },
    openGraph: {
      title: "喵喵紀錄",
      description,
      url,
      siteName: "喵喵紀錄",
      locale: "zh_TW",
      type: "website",
    },
    description,
    alternates: { canonical: url },
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
      </body>
    </html>
  )
}
