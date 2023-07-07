import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaCartPlus, FaChalkboardTeacher, FaHome, FaShoppingCart, FaUser, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import useAdminOrInstructor from "../hooks/useAdminOrInstructor";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { FcApproval } from "react-icons/fc";
import { GiPerpendicularRings } from "react-icons/gi";
import { BiSolidAddToQueue } from "react-icons/bi";
import { FcPaid } from "react-icons/fc";
import { MdManageHistory } from "react-icons/md";
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
        <>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side bg-[#3d98b5]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full text-base-content">
                        {/* Sidebar content here */}
                        {isAdminOrInstructor === "admin" && (
                            <>
                                <li><NavLink to="/dashboard/adminhome"> <FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/manageclasses"> <MdManageHistory></MdManageHistory> Manage Classes</NavLink></li>
                                <li><NavLink to="/dashboard/allusers"> <FaUsers></FaUsers> All Users</NavLink></li>
                            </>
                        )}
                        {isAdminOrInstructor === "instructor" && (
                            <>
                                <li><NavLink to="/dashboard/instructorhome"> <FaHome></FaHome> Instructor Home</NavLink></li>
                                <li><NavLink to="/dashboard/addclass"> <BiSolidAddToQueue></BiSolidAddToQueue> Add a Class</NavLink></li>
                                <li><NavLink to="/dashboard/instructorclasses"> <FcApproval></FcApproval> All My Classes</NavLink></li>
                                <li><NavLink to="/dashboard/instructorpendingclasses"> <GiPerpendicularRings></GiPerpendicularRings> Pending Classes</NavLink></li>
                            </>
                        )}
                        {isAdminOrInstructor === "student" && (
                            <>
                                <li><NavLink to="/dashboard/studenthome"> <FaHome></FaHome> Student Home</NavLink></li>
                                <li><NavLink to="/dashboard/selectedclasses"> <FaCartPlus></FaCartPlus> My Selected Classes</NavLink></li>
                                <li><NavLink to="/dashboard/enrolledclasses"> <FcPaid></FcPaid> My Enrolled Classes</NavLink></li>
                            </>
                        )}

                        <div className="divider"></div>
                        <li><NavLink to="/"> <FaHome></FaHome>Go to Home</NavLink></li>
                        <li><NavLink to="/instructors"> <FaChalkboardTeacher></FaChalkboardTeacher>Instructors</NavLink></li>
                        <li><NavLink to="/classes"> <FaBook></FaBook>Classes</NavLink></li>
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Dashboard;