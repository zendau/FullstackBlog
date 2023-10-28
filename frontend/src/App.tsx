import React, { Suspense } from "react";
import { store } from "./redux/store";
// import AppRouter from "./router/AppRouter";

import { Provider } from "react-redux";

import "./styles/App.scss";
import Loader from "./components/UI/loader/loader";
import Router from "./router";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
    </Provider>
  );
};

export default App;
