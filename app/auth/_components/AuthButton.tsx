'use client'
import { Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session, status } = useSession();

  const popupCenter = (url:string, title:string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;
    
    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

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