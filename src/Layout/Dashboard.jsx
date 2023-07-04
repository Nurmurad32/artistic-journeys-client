import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaHome, FaShoppingCart, FaUser, FaUtensils, FaWallet } from 'react-icons/fa';
import useAdminOrInstructor from "../hooks/useAdminOrInstructor";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    //   const [cart] = useCart();

    // TODO: load data from the server to have dynamic isAdmin based on data
    // const isAdmin = true;
    //   const [isAdmin] = useAdmin();


    const [isAdminOrInstructor] = useAdminOrInstructor();
    console.log(isAdminOrInstructor)

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side bg-[#D1A054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full text-base-content">
                    {/* Sidebar content here */}
                    {isAdminOrInstructor === "admin" && (
                        <>
                            <li><NavLink to="/dashboard/adminhome"> <FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/manageclasses"> <FaBook></FaBook> Manage Classes</NavLink></li>
                            <li><NavLink to="/dashboard/allusers"> <FaUser></FaUser> All Users</NavLink></li>
                        </>
                    )}
                    {isAdminOrInstructor === "instructor" && (
                        <>
                            <li><NavLink to="/dashboard/instructorhome"> <FaHome></FaHome> Instructor Home</NavLink></li>
                            <li><NavLink to="/dashboard/addclass"> <FaBook></FaBook> Add a Class</NavLink></li>
                            <li><NavLink to="/dashboard/instructorclasses"> <FaUser></FaUser> All My Classes</NavLink></li>
                            <li><NavLink to="/dashboard/instructorpendingclasses"> <FaUser></FaUser> Pending Classes</NavLink></li>
                        </>
                    )}
                    {isAdminOrInstructor === "student" && (
                        <>
                            <li><NavLink to="/dashboard/studenthome"> <FaHome></FaHome> Student Home</NavLink></li>
                            <li><NavLink to="/dashboard/selectedclasses"> <FaBook></FaBook> My Selected Classes</NavLink></li>
                            <li><NavLink to="/dashboard/enrolledclasses"> <FaUser></FaUser> My Enrolled Classes</NavLink></li>
                        </>
                    )}

                    <div className="divider"></div>
                    <li><NavLink to="/"> <FaHome></FaHome>Go to Home</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;