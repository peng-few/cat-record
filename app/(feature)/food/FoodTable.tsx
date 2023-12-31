import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import TableBody from '@mui/material/TableBody';
import { notExist, toDecimalPlace } from "@/_lib"
import { PageProps } from "@/_types"
import React, { Suspense } from "react"
import { Loading } from "@/_components/Loading"
import { getBrandPairs } from "@/(feature)/brand/_db/getBrandPairs"
import { getFoodsByBrand } from "./_db/getFoodsByBrand"
import { FoodTypeName } from "./_consts/FoodType"
import formatPagination from "@/_lib/formatPagination"
import Link from "next/link"
import Button  from "@mui/material/Button"
import getFileSrc from "@/(feature)/file/_lib/getFileSrc"
import Image from "next/image"
import { isAdmin } from "@/auth/_db/schema/UserSchema"
import { type Session } from "next-auth"
import dynamic from "next/dynamic"
import { toggleParam } from "@/_lib/searchParams/handleSearchParam"

const FoodListAction = dynamic(() => import('./FoodTableAction'), {
  ssr: false,
})

export interface FoodTableProps extends PageProps{
  session: Session | null
  urlParams: URLSearchParams
}
export default async function FoodTable({searchParams, session,urlParams}:FoodTableProps) {
  const [brandPairs, foodsByBrand] = await Promise.all([getBrandPairs(), getFoodsByBrand(searchParams)])
  const { data: brandsFood, pagination } = foodsByBrand;
  const { prevPage, nextPage, maxPage } = formatPagination(pagination)
  return (
    <>
      <p className="my-3 text-sm">
        比例皆為乾物比
      </p>
      {brandsFood?.map(brand => (
        <React.Fragment key={brand._id}>
          <Typography variant="h2">{brandPairs[brand._id].name}</Typography>
          <Typography variant="overline">{brandPairs[brand._id].remark}</Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 5 }}>
            <Table sx={{ minWidth: 650, '.MuiTableCell-head': {fontSize: '0.75rem',position: 'sticky'} }}>
              <TableHead>
                <TableRow>
                  <TableCell size="small">品項</TableCell>
                  <TableCell size="small"></TableCell>
                  <TableCell align="right" size="small">
                    代謝能
                    <span className="ps-1 text-stone-400">
                      (kcal ME/100g)
                    </span>
                  </TableCell>
                  <TableCell align="right" size="small">
                    碳水化合物
                    <span className="ps-1 text-stone-400">
                      (%)
                    </span>
                  </TableCell>
                  <TableCell align="right" size="small">
                    蛋白質
                    <span className="ps-1 text-stone-400">
                      (%)
                    </span>
                  </TableCell>
                  <TableCell align="right" size="small">
                    脂肪
                    <span className="ps-1 text-stone-400">
                      (%)
                    </span>
                  </TableCell>
                  <TableCell align="right" size="small">
                    磷
                    <span className="ps-1 text-stone-400">
                      (mg/100kcal)
                    </span>
                  </TableCell>
                  <TableCell align="right" size="small">鈣磷比</TableCell>
                  <TableCell size="small"></TableCell>
                </TableRow>
              </TableHead>
              <Suspense fallback={<Loading/>}>
                <TableBody>
                  {brand.foods.map((food) => (
                    <TableRow
                      key={food._id}
                      sx={{ '&:last-child > *': { borderBottom: 'unset!important' } }}
                    >
                      <TableCell size="small" sx={{ pr: 0, width: '100px'}}>
                        {food.imgId && <Image
                            src={getFileSrc(food.imgId)}
                            alt={brandPairs[brand._id] + food.name}
                            width={100}
                            height={75}
                            className="mt-1"
                          />}
                      </TableCell>
                      <TableCell sx={{ width: '130px', pr: 0 }}>
                        <h3>
                          {food.name} <span className="text-stone-400 text-xs block">{FoodTypeName[food.type]}</span>
                        </h3>   
                      </TableCell>
                      <TableCell align="right">{`${Math.round(food.energy)}`}</TableCell>
                      <TableCell align="right">{`${Math.round(food.carbonhydrate)}`}</TableCell>
                      <TableCell align="right">{`${Math.round(food.protein)}`}</TableCell>
                      <TableCell align="right">{`${Math.round(food.fat)}`}</TableCell>
                      <TableCell align="right">
                       { notExist(food.phosphorus) ? '-' : `${Math.round(food.phosphorus)}`}
                      </TableCell>
                      <TableCell align="right">
                        {(notExist(food.phosphorus) || notExist(food.calcium))
                          ? '-'
                          : `${toDecimalPlace(food.calcium/food.phosphorus, 1)}`}
                      </TableCell>
                      <TableCell>
                        {isAdmin(session?.user.role) && <FoodListAction food={food}/>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Suspense>   
            </Table>
          </TableContainer>
        </React.Fragment>
      ))}
      {
          prevPage > 0 && (
          <Link href={{
              query: toggleParam(new URLSearchParams(urlParams), [
                "page",
                prevPage,
              ]).toString()
            }}>
              <Button variant="outlined">上一頁</Button>  
            </Link>
          )
        }
        {
          nextPage <= maxPage&& (
            <Link href={{
              query: toggleParam(new URLSearchParams(urlParams), [
                "page",
                nextPage,
              ]).toString()
            }}>
              <Button variant="outlined">下一頁</Button>  
            </Link>
          )
        }
    </>
  )
}
