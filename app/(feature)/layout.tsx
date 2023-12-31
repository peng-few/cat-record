import type { Metadata } from "next"
import ThemeRegistry from "@/(feature)/_layout/theme/ThemeRegistry"
import LocalizationProvider from "./_layout/LocalizationProvider"
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined"
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined"
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined"
import Navbar from "./_layout/Navbar"
import { Suspense } from "react"
import { Loading } from "@/_components/Loading"
import { FoodType, FoodTypeName } from "./food/_consts/FoodType"
import NavbarList, { NavbarItemProps } from "./_layout/NavbarList"
import { PageProps } from "@/_types"
import { WebSite, WithContext } from "schema-dts"
import AuthButton from "@/auth/_components/AuthButton"
import SessionProvider from "@/auth/_components/SessionProvider"
import { getHost } from "@/_lib/getHost";
const Host = getHost()

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: 'https://'+process.env.VERCEL_URL,
}
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const url = Host
  const description =
    "了解貓咪的各種主食罐/副食罐/乾飼料營養成份，尋找適合自己貓咪的食物。還可以紀錄每日貓咪的飲食狀況"
  return {
    title: {
      template: "%s | 喵喵紀錄",
      default: "喵喵紀錄",
    },
    robots: 'index,follow,noarchive',
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

export const menus: NavbarItemProps[] = [
  {
    name: "飲食紀錄",
    path: "/",
    Icon: HistoryEduOutlinedIcon,
  },
  {
    name: "貓食一覽",
    path: "/food",
    sub: [
      {
        name: FoodTypeName[FoodType.Enum.Compelete],
        path: `/food?type=${FoodType.Enum.Compelete}`,
      },
      {
        name: FoodTypeName[FoodType.Enum.Complementary],
        path: `/food?type=${FoodType.Enum.Complementary}`,
      },
      {
        name: FoodTypeName[FoodType.Enum.Dry],
        path: `/food?type=${FoodType.Enum.Dry}`,
      },
    ],
    Icon: FoodBankOutlinedIcon,
  },
  {
    name: "品牌一覽",
    path: "/brand",
    Icon: StorefrontOutlinedIcon,
  },
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeRegistry options={{ key: "few" }}>
      <LocalizationProvider>
        <div className="flex">
          <SessionProvider>
            <Navbar>
              <NavbarList
                list={menus}
                sx={{
                  "&>.MuiListItem-root": {
                    py: 1,
                  },
                }}
              />
                <AuthButton />
            </Navbar>
            <div className="flex-grow">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </SessionProvider>
        </div>
      </LocalizationProvider>
    </ThemeRegistry>
  )
}
