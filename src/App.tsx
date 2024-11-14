import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import "./assets/stylesheets/application.scss"

export const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
