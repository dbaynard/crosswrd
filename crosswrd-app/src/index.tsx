import { StrictMode } from "react";
import { render } from "react-dom";
import { init as Sentry } from "@sentry/react";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

Sentry({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  release: `crosswrd@${process.env.REACT_APP_DEPLOY_SHA}`,
  environment: process.env.REACT_APP_CONTEXT,
});

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
