import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import image404 from "/svg/404.svg";

export const NotFoundPage = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            cursor: "pointer",
            color: "var(--gray)",
            fontSize: "16px",
            alignSelf: "start",
            paddingLeft: "32px",
          }}
        >
          На главную
        </Link>
        <img src={image404} alt="404" width={320} height={200} />
        <p style={{ fontSize: "20px", textAlign: "center" }}>
          Страницы по этому адресу нет. <br /> Проверьте адрес или перейдите на
          главную
        </p>
      </div>
    </Layout>
  );
};
