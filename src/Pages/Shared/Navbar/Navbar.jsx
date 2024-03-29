import { Link, useLocation, useNavigation } from "react-router-dom";
import logo from "../../../assets/logo.png"
import useAuth from "../../../hooks/useAuth";
import useAdminOrInstructor from "../../../hooks/useAdminOrInstructor";
import useCart from "../../../hooks/useCart";
import './Navbar.css'
import ActiveLink from "../../../Components/ActiveLink/ActiveLink";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigation()

    const { user, logOut } = useAuth();
    const [isAdminOrInstructor] = useAdminOrInstructor();
    console.log("From Navbar: ",isAdminOrInstructor)
    const [cart, refetch] = useCart()
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => { console.log(error); });
    }

    const navItems = <>
        <li className="pr-3"><ActiveLink to="/">Home</ActiveLink ></li>
        <li className="pr-3"><a href="/#about">About Us</a ></li>
        <li className="pr-3"><ActiveLink to="/instructors">Instructors</ActiveLink ></li>
        <li className="pr-3"><ActiveLink to="/classes">Courses</ActiveLink ></li>
    </>
    return (
        <>
            <div className={`navbar z-10 bg-opacity-50 max-w-screen-xl mx-auto bg-[#F6F9FC] text-black`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">

                    {user
                        ? <>
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <Link to={cart?.length > 0 ? "/dashboard/selectedclasses" : " "}>
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge badge-sm indicator-item">{cart?.length}</span>
                                    </div>
                                </Link>
                            </label>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {user && <img src={user?.photoURL} />}
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    {user &&
                                        <>
                                            {
                                                isAdminOrInstructor === "admin" ? (
                                                    <>
                                                        <li><Link to='/dashboard/adminhome'>Admin Dashboard</Link></li>
                                                    </>
                                                ) : isAdminOrInstructor === "instructor" ? (
                                                    <>
                                                        <li><Link to='/dashboard/instructorhome'>Instructor Dashboard</Link></li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li><Link to='/dashboard/studenthome'>My Dashboard</Link></li>
                                                    </>
                                                )
                                            }
                                            <li><Link onClick={handleLogOut} >Log Out</Link></li>
                                        </>
                                    }
                                </ul>
                            </div>
                        </>
                        : <li className=" ml-4 btn btn-sm bg-[#D05A32] hover:bg-[#3d98b5] text-white"><Link to='/login'>Login</Link></li>}
                    {/* Profile dropdown */}

                </div>
            </div>
        </>
    );
};

export default Navbar;