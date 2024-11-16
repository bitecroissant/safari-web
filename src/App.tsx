import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import "./assets/stylesheets/application.scss"
import 'virtual:uno.css'
// @ts-ignore
import 'virtual:svgsprites'
// toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"

export const App = () => {

  return (
    <>
      <ToastContainer
        autoClose={1200}
      />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  )
}

export default App
