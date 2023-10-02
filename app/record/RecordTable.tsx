import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import TableBody from '@mui/material/TableBody';
import { Suspense } from "react"
import { Loading } from "@/_components/Loading"
import ExpandedTableRow from "@/_components/ExpandedTableRow";
import FocusedRowProvider from "@/_components/FocusedRowProvider";
import { getBrandPairs } from "@/brand/_firebase/getBrandPairs"
import { getRecords } from "./_firebase/getRecords"
import RecordTableDetail from "./RecordTableDetail"
import dayjs from "dayjs"
import { toDecimalPlace } from "@/_lib"

export default async function RecordTable() {
  const [brandPairs, records] = await Promise.all([getBrandPairs(), getRecords({ page: 1 })])
  return (
    <>
      <Typography className="pt-3" variant="caption" display="block">
        *比例皆為乾物比
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell size="medium">日期</TableCell>
              <TableCell align="right">
                熱量
                <Typography className="ps-1" variant="caption">
                  (kcal)
                </Typography>
              </TableCell>
              <TableCell align="right">
                水量
                <Typography className="ps-1" variant="caption">
                  (ml)
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              <FocusedRowProvider>
              {records?.map(record => (
                <ExpandedTableRow
                  key={record.id}
                  detail={<RecordTableDetail record={record.list}/>}
                  colSpan={4}
                  id={record}
                >
                  <TableCell>{dayjs(record.id).format('YYYY/MM/DD')}</TableCell>
                  <TableCell align="right">{`${toDecimalPlace(record.energy,2)}`}</TableCell>
                  <TableCell align="right">{`${toDecimalPlace(record.totalWater,2)}`}</TableCell>
                </ExpandedTableRow>
              ))}
              </FocusedRowProvider>
            </TableBody> 
        </Table>
      </TableContainer>
    </>
  )
}
