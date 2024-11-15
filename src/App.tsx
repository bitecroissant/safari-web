import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import "./assets/stylesheets/application.scss"
import 'virtual:uno.css'

export const App = () => {

  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }}  />
    </>
  )
}

export default App
