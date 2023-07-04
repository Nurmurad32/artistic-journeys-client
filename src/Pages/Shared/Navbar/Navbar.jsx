import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png"
import useAuth from "../../../hooks/useAuth";
import useAdminOrInstructor from "../../../hooks/useAdminOrInstructor";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isAdminOrInstructor] = useAdminOrInstructor();
    const [cart] = useCart()

    // console.log(user.photoURL)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => { console.log(error); });
    }

    const navItems = <>
        <li><Link to="/">Home</Link ></li>
        <li><Link to="/instructors">Instructors</Link ></li>
        <li><Link to="/classes">Classes</Link ></li>
        {user
            ?
            <>
                <li><Link onClick={handleLogOut} >Log Out</Link></li>
                {isAdminOrInstructor === "admin" && (<li><Link to='/dashboard/adminhome'>Dashboard</Link></li>)}
                {isAdminOrInstructor === "instructor" && (<li><Link to='/dashboard/instructorhome'>Dashboard</Link></li>)}
                {isAdminOrInstructor === "student" && (<li><Link to='/dashboard/studenthome'>Dashboard</Link></li>)}

            </>
            :
            <><li><Link to='/login'>Login</Link></li></>
        }
    </>
    return (
        <div className=" z-10">
            <div className=" navbar">
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
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <Link to={ cart?.length > 0 ? "/dashboard/selectedclasses" : " "}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cart?.length || 0}</span>
                            </div>
                        </Link>
                    </label>
                    <div className="w-10 rounded-full">
                        <img src={user && user?.photoURL} />
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Navbar;