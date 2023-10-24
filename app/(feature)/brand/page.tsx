import BrandAdd from "./BrandAdd";
import { Suspense } from "react";
import { Loading } from "@/_components/Loading";
import BrandList from "./BrandList";
import { getUserSession } from "@/auth/_lib/getUserSession";
import { isAdmin } from "@/auth/_db/schema/UserSchema";
import { Typography } from "@mui/material";

export default async function BrandPage() { 
  const session = await getUserSession()
  return (
    <div className="py-4 px-6">
      <Typography variant="h1" className="inline-block pr-3">貓食品牌一覽</Typography>
      {isAdmin(session?.user.role) && <BrandAdd />}
      <p className="mt-3">點擊品牌查看詳細產品!</p>
      <Suspense fallback={<Loading />}>
        <BrandList session={session}/>
      </Suspense>
    </div>
  )
}