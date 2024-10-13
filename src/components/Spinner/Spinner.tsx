import { RiseLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "auto",
  borderColor: "red",
};

export const Spinner: () => JSX.Element = () => {
  return (
    <div>
      <RiseLoader color="var(--brand)" cssOverride={override} size={30} />
    </div>
  );
};
