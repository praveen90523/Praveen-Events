import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import  ScrollToTop  from "./ScrollToTop/ScrollToTop";
import ScrollEffects from "./ScrollEffects/ScrollEffects";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <ScrollToTop />
      <ScrollEffects />
      <App />

    </BrowserRouter>
  </StrictMode>
);
