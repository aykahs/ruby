import {  Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import useSession from '../Hooks/useSession'
import ErrorState from '../component/ErrorState'
import Loader from '../component/Loader'

const Routeprivate = (props) => {
    const { redirectTo = '/login', children } = props
    const { isAuthenticated, loadingUserData } = useSession()
    if (loadingUserData) {
        return null
    }
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />
    }
    return (
        <ErrorBoundary
            fallback={<ErrorState text="An error occurred in the application." />}
        >
            <Suspense fallback={<Loader />}>{children}</Suspense>
        </ErrorBoundary>
    )
}
export default Routeprivate
