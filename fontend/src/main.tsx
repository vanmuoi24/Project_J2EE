import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store, persistor } from "@/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
<<<<<<< HEAD
=======
import '@ant-design/v5-patch-for-react-19';
import "antd/dist/reset.css";
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

>>>>>>> 01a2cac

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
