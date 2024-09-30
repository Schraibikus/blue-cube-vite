import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <h2>
      This page doesnt exist. Go go <Link to="/">home</Link>
    </h2>
  );
};
