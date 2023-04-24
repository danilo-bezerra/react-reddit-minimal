import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.scss";
import { Routes } from "./routes/Routes.tsx";
import { RedditContextProvider } from "./contexts/RedditContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RedditContextProvider>
      <Routes />
    </RedditContextProvider>
  </React.StrictMode>
);
