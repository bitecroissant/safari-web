import { createBrowserRouter, Outlet } from "react-router-dom";
import { Root } from "../components/Root";
import { SolarTerms } from "../pages/SolarTermsPage";
import { EventDatesPage } from "../pages/EventDatesPage";
import { PoetryLinesPage } from "../pages/PoetryLinesPage";
import { LuPostPage } from "../pages/LuPostPage";
import { PoetryLinesEditPage } from "../pages/PoetryLinesEditPage";
import { DailyBoard } from "../pages/DailyBoard";
import { SginInPage } from "../pages/SignInPage";
import { ajax } from "../lib/ajax";
import { ErrorUnauthorized } from "../errors";
import { AuthErrorPage } from "../pages/AuthErrorPage";

export const router = createBrowserRouter([

    { path: '/', element: <Root /> },
    { path: '/sentry', element: <SginInPage /> },
    {
        path: '/',
        element: <Outlet />,
        errorElement: <AuthErrorPage />,
        loader: async () => {
            return await ajax.get<UserTokens>('/me')
                .catch((e) => {
                    if (e.response?.status === 403) { throw new ErrorUnauthorized() }
                })
        },
        children: [
            {
                path: '/solar-terms',
                element: <SolarTerms />,
            },
            {
                path: '/event-dates',
                element: <EventDatesPage />,
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
            },
            {
                path: '/sentry',
                element: <SginInPage />
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