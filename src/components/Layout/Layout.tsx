import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { HeaderBar } from "../HeaderBar";
import styles from "./Layout.module.scss";

// import styles from "@/components/layout/layout.module.scss";
// import { useAppSelector } from "@/hooks/redux";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <HeaderBar />
      <Outlet />
      <div>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};
