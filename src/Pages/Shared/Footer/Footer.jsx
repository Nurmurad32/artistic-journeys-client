import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Footer = () => {
    return (
        <footer className='bg-[#7c746c]'>
            <div className="footer p-10 bg-base-200 text-base-content">
                <div>
                    <img src={logo} alt="" />
                    <p className="pl-8">ARTISTIC JOURNEYS<br />Providing reliable education.</p>
                </div>
                <div>
                    <span className="footer-title">Important Links</span>
                    <Link to="/">Home</Link >
                    <Link to="/instructors">Instructors</Link >
                    <Link to="/classes">Classes</Link >
                </div>
                <div>
                    <span className="footer-title">Newsletter</span>
                    <div className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="relative">
                            <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                            <button className="btn hover:bg-[#3d98b5] bg-[#D05A32] text-white absolute top-0 right-0 rounded-l-none">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer bg-base-200 footer-center p-4 text-base-content">
                <div>
                    <small>Copyright © 2023 - All right reserved by ARTISTIC.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;