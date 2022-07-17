import React, { Suspense } from 'react'
import { store } from "./redux"
import AppRouter from "./router/AppRouter"

import { AuthContext } from "./context/AuthContext"
import { Provider } from "react-redux";


const CheckAuth = React.lazy(() => import('./components/CheckAuth'))

import "./App.scss"
import Loader from "./components/UI/loader/loader";


const App: React.FC = () => {

  const [authStatus, setAuthStatus] = React.useState(false)

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        <Suspense fallback={<Loader />}>
          <CheckAuth>
            <AppRouter />
          </CheckAuth>
        </Suspense>
      </AuthContext.Provider>
    </Provider>
  )
}

export default App
