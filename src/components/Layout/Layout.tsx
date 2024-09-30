import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { HeaderBar } from "../HeaderBar";
import styles from "./Layout.module.scss";

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
