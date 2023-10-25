import BrandsProvider from "@/(feature)/brand/_components/BrandsProvider";
import Typography from "@mui/material/Typography";
import RecordAdd from "@/(feature)/record/RecordAdd";
import FoodsProvider from "@/(feature)/food/_components/FoodsProvider";
import RecordTable from "@/(feature)/record/RecordTable";
import { Suspense } from "react";
import { Loading } from "@/_components/Loading";
import { PageProps } from "@/_types";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: '貓咪飲食記錄',
  description: '紀錄屬於你家貓咪的飲食紀錄，隨時追蹤食量狀況'
}
 
export default async function RecordPage({ searchParams }: PageProps) {
  return (
    <div className="py-4 px-6">
      <Typography className="pb-3" variant="h1" display="block">
        貓咪飲食記錄
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