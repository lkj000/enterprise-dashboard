import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { callExpressServerEndpoint, getExpressServerUrl } from "./utils";

const render = response => {

  const expressServerUrl = getExpressServerUrl();

  if (response.status === 200) {
    const data = response.data;
    setLocalStorageData(data);

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App userGroups={data.userData.groups}/>
        </BrowserRouter>
      </React.StrictMode>
    );
  } else {
    window.location.href = `${expressServerUrl}/login`;
  }
};

const setLocalStorageData = data => {
  const userData = data.userData;

  localStorage.setItem('shortname', userData.shortname ? userData.shortname : '');
  localStorage.setItem('username', userData.username ? userData.username : '');
  localStorage.setItem('token', userData.token ? userData.token : '');
  localStorage.setItem('userid', userData.userid ? userData.userid : '');
  localStorage.setItem('fname', userData.givenname ? userData.givenname : '');
  localStorage.setItem('lname', userData.surname ? userData.surname : '');
}

callExpressServerEndpoint('GET', 'user', null, render);


