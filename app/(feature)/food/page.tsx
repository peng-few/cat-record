import FoodTable from "./FoodTable"
import BrandsProvider from "@/(feature)/brand/_components/BrandsProvider"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { FoodTypeName, foodTypeToName } from "./_consts/FoodType"
import { PageProps } from "@/_types"
import { Suspense, cache } from "react"
import { Loading } from "@/_components/Loading"
import ChipMenu from "@/_components/ChipMenu"
import objToSelectOptions from "@/_lib/objToSelectOptions"
import toUrlSearchParams from "@/_lib/searchParams/toUrlSearchParams"
import isSelectedParam from "@/_lib/searchParams/isSelectedParam"
import { refreshPage, toggleParam } from "@/_lib/searchParams/handleSearchParam"
import Link from "next/link"
import { Metadata } from "next"
import TuneIcon from "@mui/icons-material/Tune"
import ParamLink from "./_components/ParamLink"
import { SearchParamType, getParamNames } from "./_consts/SearchParam"
import { getBrandPairs } from "@/(feature)/brand/_db/getBrandPairs"
import { isAdmin } from "@/auth/_db/schema/UserSchema"
import { getUserSession } from "@/auth/_lib/getUserSession"
import { getHost } from "@/_lib/getHost";
const Host = getHost()
const foodTypeOptions = objToSelectOptions(FoodTypeName)

import dynamic from "next/dynamic"
const FoodAdd = dynamic(() => import('./FoodAdd'), {
  ssr: false,
});


export interface FoodPageProps extends PageProps{
  searchParams: { [key in SearchParamType|'page']?: string | string[]}
}

const getFoodParamLabel = cache(async (searchParams: FoodPageProps["searchParams"]) => {
  const { type = '', phosphorus = '', fishmeat = '', protein = '', carbon = '' } = getParamNames(searchParams)
  const brandVal = typeof searchParams.brand === 'string' ? [searchParams.brand] : searchParams.brand;
  const brandPairs = await getBrandPairs()
  const brandNames = brandVal?.map(brand => brandPairs[brand].name).join('、') || ''
  
  return {
    title: `${phosphorus}${protein}${carbon}${fishmeat}${brandNames}貓${type || "罐頭/乾飼料"}成份一覽`,
    detail: {
      type,
      phosphorus,
      fishmeat,
      protein,
      carbon,
      brandNames,
    },
  }
})

export async function generateMetadata(
  { searchParams }: FoodPageProps,
): Promise<Metadata> {
  const { title, detail:{ type, phosphorus , fishmeat, protein, carbon, brandNames } } = await getFoodParamLabel(searchParams)
  const adjective = phosphorus + protein + carbon + fishmeat
  const queryString = toUrlSearchParams(searchParams).toString()

  const description =`各式${adjective && adjective + '的'}貓${type || "罐頭/乾飼料"}營養成份，
  找到最符合你的貓咪的食物。${brandNames}品牌旗下貓${type || "罐頭/乾糧"}的成分內容數值列表`

  return {
    title,
    description,
    openGraph: {
      title: `${title}|喵喵紀錄`,
      description,
    },
    alternates: { canonical: `${Host}?${queryString}` },
  }
}

export default async function FoodPage({ searchParams }: FoodPageProps) {
  const { type } = searchParams
  const foodTypeName = foodTypeToName(type)
  const { title } = await getFoodParamLabel(searchParams)
  const urlParams = toUrlSearchParams(searchParams)
  const session = await getUserSession()
  const queryString = urlParams.toString() 

  return (
    <div className="py-4 px-6">
      <BrandsProvider>
        <Typography className="pb-3" variant="h1">
          {title}
        </Typography>
        {isAdmin(session?.user.role) && <FoodAdd />}
        <Box sx={{ ".MuiChip-root": { mr: 0.6 } }}>
          <div className="inline-flex text-stone-500 text-sm mr-2 items-center align-middle">
            <TuneIcon sx={{ fontSize: "14px", mb: 0.2 }} /> 條件篩選
          </div>
          <ChipMenu label={foodTypeName} placeholder="種類">
            {foodTypeOptions.map((option) => (
              <Link
                key={option.value}
                href={{
                  pathname: '/food',
                  query: refreshPage(
                    toggleParam(new URLSearchParams(urlParams), [
                      "type",
                      option.value,
                    ])).toString(),
                }}
              >
                <MenuItem>
                  {option.label}
                  {isSelectedParam(option.value, type) && (
                    <CheckCircleIcon
                      sx={{
                        fontSize: "14px",
                        ml: "8px",
                        fill: "#ebaf1a",
                      }}
                    />
                  )}
                </MenuItem>
              </Link>
            ))}
          </ChipMenu>
          <ParamLink type="protein" value="high" urlParams={urlParams} />
          <ParamLink type="protein" value="low" urlParams={urlParams} />
          <ParamLink type="phosphorus" value="low" urlParams={urlParams} />
          <ParamLink type="carbon" value="low" urlParams={urlParams} />
          <ParamLink type="fishmeat" value="0" urlParams={urlParams} />
        </Box>
        <Suspense key={queryString} fallback={<Loading />}>
          <FoodTable searchParams={searchParams} session={session} urlParams={urlParams}/>
        </Suspense>
      </BrandsProvider>
    </div>
  )
}
