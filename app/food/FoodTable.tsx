import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import TableBody from '@mui/material/TableBody';
import { unitConverter,toDecimalPlace } from "@/_lib"
import { isDry } from "./_data/FoodTypes"
import { Suspense } from "react"
import { Loading } from "@/_components/Loading"
import FoodListAction from "./FoodTableAction";
import ExpandedTableRow from "@/_components/ExpandedTableRow";
import FoodListDetail from "./FoodTableDetail";
import FocusedRowProvider from "@/_components/FocusedRowProvider";
import { getBrandPairs } from "@/brand/_firebase/getBrandPairs"
import { getFoods } from "./_firebase/getFoods"

export default async function FoodTable() {
  const [brandPairs, foods] = await Promise.all([getBrandPairs(), getFoods()])

  const dryBasisFoods = foods?.map((food) => {
    if (isDry(food.type) || !food.water) return food
    const toDry = unitConverter.toDryMatterBasis(food.water)
    const { carbonhydrate, protein, fat, ...rest } = food
    return {
      ...rest,
      carbonhydrate: toDry(carbonhydrate),
      protein: toDry(protein),
      fat: toDry(fat),
    }
  })

  return (
    <>
      <Typography className="pt-3" variant="caption" display="block">
        *比例皆為乾物比
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell size="medium"></TableCell>
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
              <FocusedRowProvider>
              {dryBasisFoods?.map((food,idx) => (
                <ExpandedTableRow
                  key={food.id}
                  detail={<FoodListDetail food={food}/>}
                  colSpan={9}
                  id={food.id}
                >
                  <TableCell size="medium" sx={{maxWidth: '150px'}}>
                    {brandPairs?.[food.brand]}{food.name}
                  </TableCell>
                  <TableCell align="right">{`${food.energy}`}</TableCell>
                  <TableCell align="right">{`${food.carbonhydrate}`}</TableCell>
                  <TableCell align="right">{`${food.protein}`}</TableCell>
                  <TableCell align="right">{`${food.fat}`}</TableCell>
                  <TableCell align="right">
                  {`${food.phosphorus && unitConverter.percentageToMg(food.phosphorus,food.energy)}`}
                  </TableCell>
                  <TableCell align="right">
                  {`${food.phosphorus && food.calcium && toDecimalPlace(food.calcium/food.phosphorus, 1)}`}
                  </TableCell>
                  <TableCell>
                    <FoodListAction food={foods[idx]}/>
                  </TableCell>
                </ExpandedTableRow>
              ))}
              </FocusedRowProvider>
            </TableBody>
          </Suspense>   
        </Table>
      </TableContainer>
    </>
  )
}
