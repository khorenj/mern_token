import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

setInterval(() => {
  const data = JSON.parse(localStorage.getItem("userData"));

  if (data && data.token) {
    fetch("/api/auth/refresh_token", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: data.userId,
            token: res.accessToken,
            userType: data.userType,
          })
        );
      })
      .catch(() => {
        console.log("Token Expired");
      });
  }
}, 10 * 1000);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
