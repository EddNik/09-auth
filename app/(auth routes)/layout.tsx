"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import css from "./LayoutNotes.module.css";
import { useRouter } from "next/navigation";

function SignLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [router]);

  return (
    <>
      {loading ? (
        <div className={css.container}>Loading...</div>
      ) : (
        <div className={css.container}>{children}</div>
      )}
    </>
  );
}

export default SignLayout;
