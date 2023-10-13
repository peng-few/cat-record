import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import TableBody from '@mui/material/TableBody';
import { toDecimalPlace } from "@/_lib"
import { PageProps } from "@/_types"
import React, { Suspense } from "react"
import { Loading } from "@/_components/Loading"
import FoodListAction from "./FoodTableAction";
import { getBrandPairs } from "@/brand/_db/getBrandPairs"
import { getFoodsByBrand } from "./_db/getFoodsByBrand"
import { FoodTypeName } from "./_consts/FoodType"
import { FocusedBox, FocusedBoxProvider } from "@/_components"
import formatPagination from "@/_lib/formatPagination"
import Link from "next/link"
import Button  from "@mui/material/Button"

export default async function FoodTable({searchParams}:PageProps) {
  const [brandPairs, foodsByBrand] = await Promise.all([getBrandPairs(), getFoodsByBrand(searchParams)])
  const { data: brandsFood, pagination } = foodsByBrand;
  const { prevPage, nextPage, maxPage } = formatPagination(pagination)
  
  return (
    <>
      <Typography className="pt-3" variant="caption" display="block">
        *比例皆為乾物比
      </Typography>
      <FocusedBoxProvider>
      {brandsFood?.map(brand => (
        <React.Fragment key={brand._id}>
          <Typography variant="h6" sx={{ mt: 5 }}>{brandPairs[brand._id]}</Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell size="medium">品項</TableCell>
                  <TableCell align="right">
                    代謝能
                    <Typography className="ps-1" variant="caption">
                      (kcal/100g)
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    碳水化合物
                    <Typography className="ps-1" variant="caption">
                      (%)
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    蛋白質
                    <Typography className="ps-1" variant="caption">
                      (%)
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    脂肪
                    <Typography className="ps-1" variant="caption">
                      (%)
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    磷
                    <Typography className="ps-1" variant="caption">
                      (mg/100kcal)
                    </Typography>
                  </TableCell>
                  <TableCell align="right">鈣磷比</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <Suspense fallback={<Loading/>}>
                <TableBody>
                  {brand.foods.map((food,idx) => (
                    <FocusedBox
                      component={TableRow}
                      key={food._id}
                      id={food._id}
                      sx={{ '& > *': { borderBottom: 'unset!important' } }}
                    >
                      <TableCell size="medium" sx={{maxWidth: '150px'}}>
                        {food.name} <span className="text-slate-400 text-xs">{ FoodTypeName[food.type] }</span>
                      </TableCell>
                      <TableCell align="right">{`${food.energy}`}</TableCell>
                      <TableCell align="right">{`${food.carbonhydrate}`}</TableCell>
                      <TableCell align="right">{`${food.protein}`}</TableCell>
                      <TableCell align="right">{`${food.fat}`}</TableCell>
                      <TableCell align="right">
                      {`${food.phosphorus}`}
                      </TableCell>
                      <TableCell align="right">
                      {`${food.phosphorus && food.calcium && toDecimalPlace(food.calcium/food.phosphorus, 1)}`}
                      </TableCell>
                      <TableCell>
                        <FoodListAction food={food}/>
                      </TableCell>
                    </FocusedBox>
                  ))}
                </TableBody>
              </Suspense>   
            </Table>
          </TableContainer>
        </React.Fragment>
      ))}
      </FocusedBoxProvider>
      {
          prevPage > 0 && (
            <Link href={`/record${prevPage == 1 ?'':'?page='+prevPage}`}>
              <Button>上一頁</Button>  
            </Link>
          )
        }
        {
          nextPage <= maxPage&& (
            <Link href={`/record?page=${nextPage}`}>
              <Button>下一頁</Button>  
            </Link>
          )
        }
    </>
  )
}
