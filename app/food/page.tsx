import FoodAdd from "./FoodAdd";
import FoodTable from "./FoodTable";
import Typography from "@mui/material/Typography";
import BrandsProvider from "@/brand/_component/BrandsProvider";

export default async function Food() {
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