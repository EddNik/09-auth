"use client";
import Link from "next/link";
import css from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function NotFoundClient() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.container} style={{ textAlign: "center" }}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist. Redirect on home
        page.
      </p>
      <Link className={css.link} href="/">
        Go back home
      </Link>
    </div>
  );
}

export default NotFoundClient;
