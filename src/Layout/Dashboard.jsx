import { Link, NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaCartPlus, FaChalkboardTeacher, FaHome, FaShoppingCart, FaUser, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import useAdminOrInstructor from "../hooks/useAdminOrInstructor";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { FcApproval } from "react-icons/fc";
import { GiPerpendicularRings } from "react-icons/gi";
import { BiSolidAddToQueue } from "react-icons/bi";
import { FcPaid } from "react-icons/fc";
import { MdManageHistory } from "react-icons/md";
import logo from "../../src/assets/logo.png"
import { BsCollectionFill } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { CiLogout } from "react-icons/ci";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    //   const [cart] = useCart();

    // TODO: load data from the server to have dynamic isAdmin based on data
    // const isAdmin = true;
    //   const [isAdmin] = useAdmin();
    const { user, logOut } = useAuth();

    // const handleLogOut = () => {
    //     logOut()
    //       .then(() => { })
    //       .catch((error) => { console.log(error); });
    //   }

    const [isAdminOrInstructor, isAdminOrInstructorLoading, refetch] = useAdminOrInstructor();
    console.log(isAdminOrInstructor?.role)
    refetch()
    return (
        <>
            {/* <Navbar></Navbar> */}
            <div className="drawer md:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn drawer-button md:hidden"><CiMenuFries /></label>
                    {/* Page content here */}
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side  text-black min-h-screen">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu w-80 min-h-full text-base-content bg-[#3d98b5]">
                        <Link to="/"> <img src={logo} alt="" /> </Link>
                        {
                            isAdminOrInstructor &&
                            <>
                                {
                                    isAdminOrInstructor === "admin" ? (
                                        <>
                                            <li><NavLink to="/dashboard/adminhome"> <FaHome /> Admin Home</NavLink></li>
                                            <li><NavLink to="/dashboard/manageclasses"> <MdManageHistory /> Manage Classes</NavLink></li>
                                            <li><NavLink to="/dashboard/allusers"> <FaUsers /> All Users</NavLink></li>
                                            <li><NavLink to="/dashboard/allenrolled"> <BsCollectionFill /> Student Enrolled</NavLink></li>
                                        </>
                                    ) : isAdminOrInstructor === "instructor" ? (
                                        <>
                                            <li><NavLink to="/dashboard/instructorhome"> <FaHome /> Instructor Home</NavLink></li>
                                            <li><NavLink to="/dashboard/addclass"> <BiSolidAddToQueue /> Add a Class</NavLink></li>
                                            <li><NavLink to="/dashboard/instructorclasses"> <FcApproval /> All My Classes</NavLink></li>
                                            <li><NavLink to="/dashboard/instructorpendingclasses"> <GiPerpendicularRings /> Pending Classes</NavLink></li>
                                           
                                        </>
                                    ) : (
                                        <>
                                            <li><NavLink to="/dashboard/studenthome"> <FaHome /> Student Home</NavLink></li>
                                            <li><NavLink to="/dashboard/selectedclasses"> <FaCartPlus /> My Selected Classes</NavLink></li>
                                            <li><NavLink to="/dashboard/enrolledclasses"> <FcPaid /> My Enrolled Classes</NavLink></li>
                                        </>
                                    )
                                }

                            </>
                        }
                        {/* {isAdminOrInstructor === "admin" && (
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
                        )} */}

                        <div className="divider"></div>
                        <li><NavLink to="/"> <FaHome></FaHome>Go to Home</NavLink></li>
                        <li><NavLink to="/instructors"> <FaChalkboardTeacher></FaChalkboardTeacher>Instructors</NavLink></li>
                        <li><NavLink to="/classes"> <FaBook></FaBook>Classes</NavLink></li>
                        {/* <li><Link onClick={handleLogOut} > <CiLogout></CiLogout> logout</Link></li> */}
                    </ul>

                </div>
            </div>
            {/* <Footer></Footer> */}
        </>
    );
};

export default Dashboard;