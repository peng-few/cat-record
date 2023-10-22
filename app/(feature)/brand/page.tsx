import { PageProps } from "@/_types";
import BrandAdd from "./BrandAdd";
import { Suspense } from "react";
import { Loading } from "@/_components/Loading";
import BrandTable from "./BrandTable";

export default async function BrandPage({ searchParams }: PageProps) { 
  return (
    <div className="py-4 px-6">
      <BrandAdd/>
      <Suspense fallback={<Loading />}>
        <BrandTable/>
      </Suspense>
    </div>
  )
}