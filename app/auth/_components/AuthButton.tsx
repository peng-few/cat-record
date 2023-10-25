'use client'
import { popupCenter } from "@/_lib/popupCenter";
import { Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="mt-10 pl-9">
        <div className="flex items-center text-sm flex-wrap">
          <Image
            src={session.user.image}
            width={20}
            height={20}
            alt={session.user.name}
            className="rounded-full mr-2"
          />
          <p>{session.user?.name}</p>
        </div>
        <Button
          sx={{mt: 1}}
          size="small"
          variant="outlined"
          onClick={() => signOut()}>登出</Button>
      </div>
    )
  }
  else if (status === "unauthenticated") {
    return (
      <div className="p-9">
        <Button
          size="small"
          variant="outlined"
          onClick={() => popupCenter("/auth/signIn", "登入")} >
          登入
        </Button>
      </div>

    )
  }
}