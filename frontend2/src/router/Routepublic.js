import {  Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import useSession from '../Hooks/useSession'
import ErrorState from '../component/ErrorState'
import Loader from '../component/Loader'
const Routepublic = (props) => {
    const { children } = props
    const { isAuthenticated } = useSession()
   
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }
    return (
        <ErrorBoundary
            fallback={<ErrorState text="An error occurred in the application." />}
        >
            <Suspense fallback={<Loader />}>{children}</Suspense>
        </ErrorBoundary>
    )
}
export default Routepublic
