import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

export default store
ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </BrowserRouter>
  </Provider>
);
