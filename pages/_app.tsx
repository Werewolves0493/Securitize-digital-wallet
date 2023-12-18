import { FC } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "./global.scss";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="main">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
