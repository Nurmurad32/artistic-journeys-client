import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <>
            <Navbar></Navbar>
            {/* <div className="max-w-screen-xl mx-auto"> */}
                <Outlet></Outlet>
            {/* </div> */}
            <Footer></Footer>
        </>
    );
};

export default Main;