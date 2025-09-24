import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./router/RouterApp.tsx";
import viVN from "antd/locale/vi_VN";
import { ConfigProvider } from "antd";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider locale={viVN}>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
