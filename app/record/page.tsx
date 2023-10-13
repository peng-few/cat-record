import BrandsProvider from "@/brand/_components/BrandsProvider";
import Typography from "@mui/material/Typography";
import RecordAdd from "./RecordAdd";
import FoodsProvider from "@/food/_components/FoodsProvider";
import RecordTable from "./RecordTable";
import { Suspense } from "react";
import { Loading } from "@/_components/Loading";
import { PageProps } from "@/_types";

export default async function RecordPage({searchParams}:PageProps) {
  return (
    <div className="py-4 px-6">
      <Typography className="pb-3" variant="h1" display="block">
        飲食記錄
      </Typography>
      <BrandsProvider>
        <FoodsProvider>
          <RecordAdd />
          <Suspense fallback={<Loading />}>
            <RecordTable searchParams={searchParams}/>
          </Suspense>
        </FoodsProvider>
      </BrandsProvider>
    </div>
  )
}