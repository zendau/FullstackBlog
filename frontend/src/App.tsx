import React, { Suspense } from 'react'
import { store } from "./redux/store"
import AppRouter from "./router/AppRouter"

import { Provider } from "react-redux";

import "./styles/App.scss"
import Loader from "./components/UI/loader/loader";

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
    </Provider>
  )
}

export default App
