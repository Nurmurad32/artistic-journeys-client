import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdminOrInstructor from "../hooks/useAdminOrInstructor";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    // const [isAdmin , isAdminLoading] = useAdmin()
    const location = useLocation();
    const [isAdminOrInstructor, isAdminOrInstructorLoading] = useAdminOrInstructor();
    console.log("From Admin Route",isAdminOrInstructor)

    if(loading || isAdminOrInstructorLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdminOrInstructor === "admin"){
        return children
    }
    return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default AdminRoute;