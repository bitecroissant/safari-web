import { createBrowserRouter, Outlet } from "react-router-dom";
import { Root } from "../components/Root";
import { SolarTerms } from "../pages/SolarTermsPage";
import { EventDates } from "../pages/EventDatesPage";

export const router = createBrowserRouter([
    { path: '/', element: <Root /> },
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                path: '/solar-terms',
                element: <SolarTerms />,
            },
            {
                path: '/event-dates',
                element: <EventDates />,
            },
        ]
    }
])