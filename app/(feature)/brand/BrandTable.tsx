import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import TableBody from '@mui/material/TableBody';
import { getBrands } from "./_db/getBrands"

export default async function BrandTable() {
  const brands = await getBrands()
  return (
    <>
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                品名
              </TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {brands?.map(brand => (
                <TableRow
                  key={brand._id}
                >
                  <TableCell>{brand.name}</TableCell>
                </TableRow>
              ))}
            </TableBody> 
        </Table>
      </TableContainer>
    </>
  )
}
