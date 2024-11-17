import { createBrowserRouter, Outlet } from "react-router-dom";
import { Root } from "../components/Root";
import { SolarTerms } from "../pages/SolarTermsPage";
import { EventDates } from "../pages/EventDatesPage";
import { PoetryLinesPage } from "../pages/PoetryLinesPage";
import { LuPostPage } from "../pages/LuPostPage";
import { PoetryLinesEditPage } from "../pages/PoetryLinesEditPage";
import { DailyBoard } from "../pages/DailyBoard";

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
            {
                path: '/poetry-lines/edit',
                element: <PoetryLinesEditPage />,
            },
            {
                path: '/lulupo',
                element: <LuPostPage />,
            },
            {
                path: '/winter-magic',
                element: <DailyBoard />
            }
        ]
    }
], {
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
    },
})