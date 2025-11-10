import { ReactNode } from "react";
import css from "./AuthNavigation.module.css";

function SignLayout({ children }: { children: ReactNode }) {
  return <div className={css.container}>{children}</div>;
}

export default SignLayout;
