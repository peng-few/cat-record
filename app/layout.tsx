import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './globals.css'
import type { Metadata } from 'next'
import ThemeRegistry from './_layout/theme/ThemeRegistry'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import Navbar from './_layout/Navbar';
import LocalizationProvider from './_layout/LocalizationProvider';
import { Suspense } from 'react';
import { Loading } from './_components/Loading';
import { revalidateTag } from 'next/cache'
import { FoodType, FoodTypeName } from './food/_consts/FoodType'
import NavbarList, { NavbarItemProps } from './_layout/NavbarList'

export const metadata: Metadata = {
  title: '喵喵紀錄',
  description: '貓咪',
}

export const menus: NavbarItemProps[] = [
  {
    name: '飲食紀錄',
    path: '/record',
    Icon: HistoryEduOutlinedIcon
  },
  {
    name: '貓食一覽',
    path: '/food',
    sub: [
      {
        name: FoodTypeName[FoodType.Enum.Compelete],
        path: `/food?type=${FoodType.Enum.Compelete}`
      },
      {
        name: FoodTypeName[FoodType.Enum.Complementary],
        path: `/food?type=${FoodType.Enum.Complementary}`
      },
      {
        name: FoodTypeName[FoodType.Enum.Dry],
        path: `/food?type=${FoodType.Enum.Dry}`
      },
    ],
    Icon: FoodBankOutlinedIcon
  },
  {
    name: '品牌一覽',
    path: '/brand',
    Icon: StorefrontOutlinedIcon
  },
  {
    name: '成分計算',
    path: '/calculator',
    Icon: CalculateOutlinedIcon
  },
]

export default function RootLayout({children,}:{children: React.ReactNode}) {
  revalidateTag('brands')
  return (
    <html lang="zh-tw">
      <body>
        <ThemeRegistry options={{ key: 'few' }}>
          <LocalizationProvider>
            <div className="flex">
              <Navbar>
                <NavbarList
                  list={menus}
                  sx={{
                    '&>.MuiListItem-root': {
                      py: 1
                    }
                  }}
                />
              </Navbar>
              <div className="flex-grow">
                <Suspense fallback={<Loading/>}>
                  {children}
                </Suspense>
              </div>
            </div>
          </LocalizationProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
