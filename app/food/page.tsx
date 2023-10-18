import FoodAdd from "./FoodAdd"
import FoodTable from "./FoodTable"
import BrandsProvider from "@/brand/_components/BrandsProvider"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { FoodTypeName, foodTypeToName } from "./_consts/FoodType"
import { PageProps } from "@/_types"
import { Suspense } from "react"
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
import { getFoodsByBrand } from "./_db/getFoodsByBrand"
import { getBrandPairs } from "@/brand/_db/getBrandPairs"

export interface FoodPageProps extends PageProps{
  searchParams: { [key in SearchParamType|'page']?: string | string[]}
}

export const getFoodParamLabel = (searchParams: FoodPageProps["searchParams"]) => {
  const detail = getParamNames(searchParams)
  const { type = '', phosphorus = '', fishmeat = '', protein = '', carbon = '' } = detail;
  
  return {
    title: `${phosphorus}${protein}${carbon}${fishmeat}貓${type || "罐頭/乾飼料"}成份一覽`,
    detail,
  }
}

export async function generateMetadata(
  { searchParams }: FoodPageProps,
): Promise<Metadata> {
  const { title, detail } = getFoodParamLabel(searchParams)
  const { type = '', phosphorus = '', fishmeat = '', protein = '', carbon = '' } = detail;
  const adjective = phosphorus + protein + carbon + fishmeat
  const [brandPairs, { data: brands }] = await Promise.all([getBrandPairs(), getFoodsByBrand(searchParams)])
  const brandNames = brands?.map(brand => brandPairs[brand._id]).join('、')
  const description =`各式${adjective && adjective + '的'}貓${type || "罐頭/乾飼料"}營養成份一覽
  找到最符合你的貓咪的食物。${brandNames}品牌旗下貓${type || "罐頭/乾飼料"}的成分內容數值列表`

  return {
    title,
    description,
    openGraph: {
      title: `${title}|喵喵紀錄`,
      description,
    },
  }
}

export default async function FoodPage({ searchParams }: FoodPageProps) {
  const foodTypeOptions = objToSelectOptions(FoodTypeName)
  const { title } = getFoodParamLabel(searchParams)
  const { type } = searchParams
  const foodTypeName = foodTypeToName(type)
  const urlParams = toUrlSearchParams(searchParams)

  return (
    <div className="py-4 px-6">
      <BrandsProvider>
        <Typography className="pb-3" variant="h1">
          {title}
        </Typography>
        <FoodAdd />
        <Box sx={{ ".MuiChip-root": { mr: 0.6 } }}>
          <div className="inline-flex text-stone-500 text-sm mr-2 items-center align-middle">
            <TuneIcon sx={{ fontSize: "14px", mb: 0.2 }} /> 條件篩選
          </div>
          <ChipMenu label={foodTypeName} placeholder="種類">
            {foodTypeOptions.map((option) => (
              <Link
                key={option.value}
                href={`/food?${refreshPage(
                  toggleParam(new URLSearchParams(urlParams), [
                    "type",
                    option.value,
                  ])
                ).toString()}`}
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
        <Suspense fallback={<Loading />}>
          <FoodTable searchParams={searchParams} />
        </Suspense>
      </BrandsProvider>
    </div>
  )
}
