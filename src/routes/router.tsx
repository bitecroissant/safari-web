import { createBrowserRouter, Outlet } from "react-router-dom";
import { Root } from "../components/Root";
import { SolarTerms } from "../pages/SolarTermsPage";
import { EventDates } from "../pages/EventDatesPage";
import { PoetryLinesPage } from "../pages/PoetryLinesPage";

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
            {
                path: '/poetry-lines',
                element: <PoetryLinesPage />,
            },
        ]
    }
], {
    future: {
        v7_fetcherPersist: false,
        v7_normalizeFormMethod: false,
        v7_partialHydration: false,
        v7_relativeSplatPath: false,
        v7_skipActionErrorRevalidation: false,
    },
})