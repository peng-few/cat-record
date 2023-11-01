import BrandsProvider from "@/(feature)/brand/_components/BrandsProvider";
import Typography from "@mui/material/Typography";
import FoodsProvider from "@/(feature)/food/_components/FoodsProvider";
import RecordTable from "@/(feature)/record/RecordTable";
import { Suspense } from "react";
import { Loading } from "@/_components/Loading";
import { PageProps } from "@/_types";
import type { Metadata } from 'next'
import { getHost } from "@/_lib/getHost";
import toUrlSearchParams from "@/_lib/searchParams/toUrlSearchParams";
import { getUserSession } from "@/auth/_lib/getUserSession";
import dynamic from "next/dynamic"

const RecordAdd = dynamic(() => import('@/(feature)/record/RecordAdd'), {
  ssr: false,
});
const Host = getHost()
 
export const metadata: Metadata = {
  title: '貓咪飲食記錄',
  description: '紀錄屬於你家貓咪的飲食紀錄，隨時追蹤食量狀況',
  alternates: { canonical: Host+'/record' },
}
 
export default async function RecordPage({ searchParams }: PageProps) {
  const urlParams = toUrlSearchParams(searchParams)
  const queryString = urlParams.toString() 
  const session = await getUserSession()

  return (
    <div className="py-4 px-6">
      {session?.user && (
        <Typography className="pb-3" variant="h1" display="block">
          貓咪飲食記錄
        </Typography>
      )}
      <BrandsProvider>
        <FoodsProvider>
          {session?.user && <RecordAdd />}
          <Suspense key={queryString}  fallback={<Loading />}>
            <RecordTable searchParams={searchParams}/>
          </Suspense>
        </FoodsProvider>
      </BrandsProvider>
    </div>
  )
}