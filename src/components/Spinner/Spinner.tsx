import { RiseLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "auto",
  borderColor: "red",
};

//заставка загрузки
export const Spinner = (): JSX.Element => {
  return (
    <div>
      <RiseLoader color="var(--brand)" cssOverride={override} size={30} />
    </div>
  );
};
