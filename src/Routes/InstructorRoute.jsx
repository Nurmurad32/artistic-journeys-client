import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdminOrInstructor from "../hooks/useAdminOrInstructor";
import PageLoading from "../Components/PageLoadong/PageLoading";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    // const [isAdmin , isAdminLoading] = useAdmin()
    const location = useLocation();
    const [isAdminOrInstructor, isAdminOrInstructorLoading] = useAdminOrInstructor();
    console.log("From Instructor Route",isAdminOrInstructor)

    if(loading || isAdminOrInstructorLoading){
        return <PageLoading />
        // return <progress className="progress w-56"></progress>
    }
    if(user && isAdminOrInstructor === "instructor"){
        return children
    }
    return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default AdminRoute;