import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import TableBody from '@mui/material/TableBody';
import ExpandedTableRow from "@/_components/ExpandedTableRow";
import RecordTableDetail from "./RecordTableDetail"
import dayjs from "dayjs"
import { toDecimalPlace } from "@/_lib"
import { getRecordDiary } from "./_db/getRecordDiary"
import { PageProps } from "@/_types"
import { Button } from "@mui/material"
import Link from "next/link"
import { FocusedBoxProvider } from "@/_components/FocusedBox"
import formatPagination from "@/_lib/formatPagination"
import Image from "next/image"
import RecordAdd from "./RecordAdd"

interface RecordTableProps{
  searchParams: PageProps['searchParams']
}

export default async function RecordTable({searchParams}: RecordTableProps) {
  const { data: recordDiary, pagination } = await getRecordDiary({ page: Number(searchParams.page) || 1 })
  const { prevPage, nextPage, maxPage } = formatPagination(pagination)

  return (
    <>
      {pagination.total === 0 ? (
        <div className="flex mt-5 rounded-2xl" style={{background: '#fcf8ea'}}>
          <Image
            src="/cat-eat.png"
            alt="沒有餵食紀錄的插圖"
            width={600}
            height={200}
            className="rounded-2xl flex-initial w-80"
          />
          <div className="pl-4 pt-5">
            <Typography variant="h2" sx={{color: '#cc773de0',fontSize: '1.3rem'}}>
              加入餵食貓咪的記錄吧!
            </Typography>
            <p className="mb-4 mt-3">
              紀錄下每日貓咪的飲食狀況，更好追蹤貓咪的身體狀況
            </p>
            <RecordAdd/>
          </div>
        </div>
      ): (
        <TableContainer component={Paper} className="mt-4">
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
              <FocusedBoxProvider>
              {recordDiary?.map(diary => (
                <ExpandedTableRow
                  key={diary._id}
                  detail={<RecordTableDetail records={diary.records}/>}
                  colSpan={4}
                  id={diary}
                >
                  <TableCell>{dayjs(diary._id).format('YYYY/MM/DD')}</TableCell>
                  <TableCell align="right">{`${toDecimalPlace(diary.totalEnergy,2)}`}</TableCell>
                  <TableCell align="right">{`${toDecimalPlace(diary.totalWater,2)}`}</TableCell>
                </ExpandedTableRow>
              ))}
              </FocusedBoxProvider>
            </TableBody>
          </Table>
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
        </TableContainer>
      )
      }
    </>
  )
}
