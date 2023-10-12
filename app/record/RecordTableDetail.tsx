import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import TableBody from '@mui/material/TableBody';
import dayjs from "dayjs"
import Box from "@mui/material/Box"
import RecordEdit from "./RecordEdit"
import { RecordStatusName } from "./_consts/RecordStatus"
import RecordDelete from "./RecordDelete"
import { getFoodPairs } from "@/food/_db/getFoodPairs"
import { Record } from "./_consts/RecordSchema"
import { WithStringId } from "@/_types"

export interface RecordTableDetailProps{
  records: WithStringId<Record>[]
}
export const RecordTableDetail = async ({ records }: RecordTableDetailProps) => {
  const foodPairs = await getFoodPairs()

  return (
    <Box sx={{marginLeft: '55px',marginRight: '15px'}}>
       <Table sx={{ m: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell size="medium">時間</TableCell>
            <TableCell>
              食物
            </TableCell>
            <TableCell align="right">
              食量
              <Typography className="ps-1" variant="caption">
                (g)
              </Typography>
            </TableCell>
            <TableCell align="right">
              加水
              <Typography className="ps-1" variant="caption">
                (ml)
              </Typography>
            </TableCell>
            <TableCell>
              狀態
            </TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map(record => (
            <TableRow
              key={record._id}
            >
              <TableCell>{`${dayjs(record.date).format('HH:mm')}`}</TableCell>
              <TableCell>{record.foodId && foodPairs[record.foodId]}</TableCell>
              <TableCell align="right">{`${record.amount}`}</TableCell>
              <TableCell align="right">{`${record.water}`}</TableCell>
              <TableCell>{RecordStatusName[record.status]}</TableCell>
              <TableCell>
                <RecordEdit record={record} />
                <RecordDelete id={record._id} sx={{ml: 1}}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
   
  )
}

export default RecordTableDetail;