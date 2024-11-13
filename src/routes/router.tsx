import { createBrowserRouter, Outlet } from "react-router-dom";
import { Root } from "../components/Root";
import { Admin } from "../pages/Admin";

export const router = createBrowserRouter([
    { path: '/', element: <Root /> },
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                path: '/admin',
                element: <Admin />
            }
        ]
    }
])