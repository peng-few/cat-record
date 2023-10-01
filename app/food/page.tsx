import FoodAdd from "./FoodAdd";
import FoodTable from "./FoodTable";
import Typography from "@mui/material/Typography";
import BrandsProvider from "@/brand/_components/BrandsProvider";
import { revalidateTag } from "next/cache";

export default async function Food() {
  revalidateTag('brands')
  return (
    <div className="py-4 px-6">
      <Typography className="pb-3" variant="h1" display="block">
        貓咪食物列表 
      </Typography>
      <BrandsProvider>
        <FoodAdd />
        <FoodTable />
      </BrandsProvider>
    </div>
  )
}