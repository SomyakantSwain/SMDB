import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.jsx";
import { Provider } from "react-redux";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <Auth0Provider
   domain="dev-vk4ivsq532ypt4ob.us.auth0.com"
   clientId="99kxymtohrsR7wE295QurDHx82EzXzMY"
   authorizationParams={{
     redirect_uri: window.location.origin
   }}
   
   
   >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Auth0Provider>
  </Provider>
);
