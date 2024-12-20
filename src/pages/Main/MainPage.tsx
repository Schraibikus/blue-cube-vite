import { Layout } from "../../components/Layout";
import styles from "./MainPage.module.scss";

export const MainPage = (): JSX.Element => {
  return (
    <Layout>
      <img
        className={styles.background}
        src="/Background.png"
        alt="background"
        width={1000}
      />
    </Layout>
  );
};
