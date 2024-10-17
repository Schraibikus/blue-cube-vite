import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { HeaderBar } from "../HeaderBar";
import styles from "./Layout.module.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  const [parent] = useAutoAnimate();
  return (
    <>
      <HeaderBar />
      <Outlet />
      <div>
        <main className={styles.main} ref={parent}>
          {children}
        </main>
      </div>
    </>
  );
};
