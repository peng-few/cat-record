import { getBrandsByRegion } from "./_db/getBrandsByRegion"
import { RegionTypeName } from "./_consts/RegionType"
import Link from "next/link"
import Typography from "@mui/material/Typography"
import BrandEditProvider from "./BrandEditProvider"
import { Session } from "next-auth"
import { isAdmin as checkIsAdmin } from "@/auth/_db/schema/UserSchema"
import BrandEdit from "./BrandEdit"
import React from "react"
import dynamic from "next/dynamic"
const BrandEditButton = dynamic(() =>  import('./BrandEditButton'), {
    ssr: false,
  })
export interface BrandTableProps{
  session: Session | null
}

export default async function BrandTable({session}: BrandTableProps) {
  const brandsByRegion = await getBrandsByRegion()
  const isAdmin = checkIsAdmin(session?.user.role) 
  return (
    <BrandEditProvider>
      {brandsByRegion.map(({ _id, brands }) => (
        <React.Fragment key={_id}>
          <Typography
            variant="h3"
            color='#e78104'
            sx={{ fontSize: '0.875rem', mt: 2 }}>{RegionTypeName[_id]}</Typography>
            <ul className="flex flex-wrap">
              {brands.map((brand) => (
                <li key={brand._id} className="my-2 flex-initial w-36">
                  <Link href={`/food?brand=${brand._id}`}>
                    {brand.name}
                  </Link>
                  {isAdmin && <BrandEditButton brand={brand}/>}     
                </li>
              ))}
            </ul>
        </React.Fragment>
      ))}
      <BrandEdit/>
    </BrandEditProvider>
  )
}
