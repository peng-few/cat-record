import FoodAdd from "./FoodAdd";
import FoodTable from "./FoodTable";
import BrandsProvider from "@/brand/_components/BrandsProvider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FoodTypeName, foodTypeToName } from "./_consts/FoodType";
import { PageProps } from "@/_types";
import { Suspense } from "react";
import { Loading } from "@/_components/Loading";
import ChipMenu from "@/_components/ChipMenu";
import ChipLink from "@/_components/ChipLink";
import objToSelectOptions from "@/_lib/objToSelectOptions";
import toUrlSearchParams from "@/_lib/searchParams/toUrlSearchParams";
import isSelectedParam from '@/_lib/searchParams/isSelectedParam'
import { refreshPage, toggleParam } from "@/_lib/searchParams/handleSearchParam";
import Link from "next/link";
import { Metadata, ResolvedMetadata } from "next";

export const generateParamNames = (searchParams:PageProps['searchParams']) => {
  const { type } = searchParams;
  const foodTypeName = foodTypeToName(type)

  return {
    title: `貓咪${foodTypeName || '食物'}一覽`
  }
} 

export async function generateMetadata(
  { searchParams }: PageProps,
  parent: ResolvedMetadata
): Promise<Metadata> {
 
  const { type } = searchParams;
  const foodTypeName = foodTypeToName(type)

  return {
    title: `貓咪${foodTypeName || '食物'}一覽`
  }
}


export default async function FoodPage({searchParams}:PageProps) {
  const foodTypeOptions = objToSelectOptions(FoodTypeName)
  const { type,phosphorus,protein,carbon,fishmeat } = searchParams; 
  const foodTypeName = foodTypeToName(type)
  const urlParams = toUrlSearchParams(searchParams)

  return (
    <div className="py-4 px-6">
      <BrandsProvider>
      <Typography className="pb-3" variant="h1">
          {`貓咪${foodTypeName || '食物'}一覽`}
      </Typography>
      <FoodAdd />
      <Box sx={{'.MuiChip-root': {m:0.3}}}>
        <ChipMenu
          label={foodTypeName}
          placeholder="種類"
        >
          {foodTypeOptions.map(
            option => (
              <Link
                key={option.value}
                href={`/food?${refreshPage(toggleParam(new URLSearchParams(urlParams), ['type', option.value])).toString()}`}>
                <MenuItem>
                  {option.label}
                  {
                    isSelectedParam(option.value,type) && (
                      <CheckCircleIcon sx={{
                        fontSize: '15px',
                        ml: '8px',
                        fill: '#ebaf1a'
                      }} />
                    )
                  }
                </MenuItem>
              </Link>
            )
          )}
        </ChipMenu>
        <ChipLink
          label="低磷"
          href={`/food?${refreshPage(toggleParam(new URLSearchParams(urlParams),['phosphorus','low'])).toString()}`}
          selected={isSelectedParam('low',phosphorus)}
        />
        <ChipLink
          label="低蛋白"
          href={`/food?${refreshPage(toggleParam(new URLSearchParams(urlParams),['protein','low'])).toString()}`}
          selected={isSelectedParam('low',protein)}
        />
        <ChipLink
          label="高蛋白"
          href={`/food?${refreshPage(toggleParam(new URLSearchParams(urlParams),['protein','high'])).toString()}`}
          selected={isSelectedParam('high',protein)}
        />
        <ChipLink
          label="低碳水"
          href={`/food?${refreshPage(toggleParam(new URLSearchParams(urlParams),['carbon','low'])).toString()}`}
          selected={isSelectedParam('low',carbon)}
        />
        <ChipLink
          label="非魚肉底"
          href={`/food?${refreshPage(toggleParam(new URLSearchParams(urlParams),['fishmeat','0'])).toString()}`}
          selected={isSelectedParam('0',fishmeat)}
        />
      </Box>
        <Suspense fallback={<Loading/>}>
          <FoodTable searchParams={searchParams} />
        </Suspense>
      </BrandsProvider>
    </div>
  )
}