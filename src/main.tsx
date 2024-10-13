import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../src/store/index.ts";
import App from "./App.tsx";
import "./styles/globals.scss";
import "./styles/toastStyles.scss";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={2000}
        limit={5}
      />
      <App />
    </Provider>
  </BrowserRouter>
);
