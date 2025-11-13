"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";

function SignLayout({ children }: { children: ReactNode }) {
  // const [loading, setLoading] = useState(true);
  const hasRefreshed = useRef(false);

  const router = useRouter();

  useEffect(() => {
    // refresh викличе перезавантаження даних

    if (!hasRefreshed.current) {
      router.refresh();
      hasRefreshed.current = true;
    }
  }, [router]);

  return (
    <>
      {hasRefreshed ? (
        <div className={css.container}>Loading...</div>
      ) : (
        <div className={css.container}>{children}</div>
      )}
    </>
  );

  // return <div className={css.container}>{children}</div>;
}

export default SignLayout;
