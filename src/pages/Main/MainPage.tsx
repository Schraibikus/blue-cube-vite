import { Layout } from "../../components/Layout";

export const MainPage = () => {
  return (
    <Layout>
      {/* <div>Главная страница</div> */}
      <img
        src="/Background.png"
        alt="background"
        width={1000}
        style={{ marginInline: "auto", marginTop: "350px" }}
      />
    </Layout>
  );
};
