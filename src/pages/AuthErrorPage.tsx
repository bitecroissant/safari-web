import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorUnauthorized } from '../errors'

export const AuthErrorPage: React.FC = () => {
    const error = useRouteError()
    const e = error as Error
    // location
    const loc = useLocation()
    const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
    if (e instanceof ErrorUnauthorized) {
        return <Navigate replace to={`/sentry?from=${from}`} />
    } else {
        return <div>其他错误 </div>
    }
}
