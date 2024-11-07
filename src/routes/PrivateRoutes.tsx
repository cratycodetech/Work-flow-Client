import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { useCurrentUser } from '@/redux/features/auth/authSlice';
import { ReactNode } from "react";


type TPrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute = ({children} : TPrivateRouteProps) => {
    const currentUser = useAppSelector(useCurrentUser)
    const location = useLocation()

    if(currentUser){
        return children
    }
    return <Navigate to="/login" state={{ from: location}} replace></Navigate>;
};

export default PrivateRoute;