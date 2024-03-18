import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className=''>
            <div className="flex flex-col md:flex-row p-10 bg-base-200 text-base-content">
                <div className="w-full md:w-3/5">
                    <img src={logo} alt="" />
                    {/* <p className="pl-8">ARTISTIC JOURNEYS<br />Providing reliable education.</p> */}
                    <p className="text-xl md:text-3xl p-3">We Educate Online To Gaining Skills And Knowledge Through Electronic Devices</p>
                    <p className="text-sm md:text-lg p-3">Fringilla ut morbi tincidunt augue interdum velit euismo. Nullam consequat volutpat donec urna lorem pellentesque.Fringilla ut morbi tincidunt augue interdum velit euismo.</p>
                    <div className="hidden md:block">
                    <div className="divider divider-warning py-4 m-0 "></div>
                    </div>
                    
                    <div className="px-4 flex justify-center md:justify-between">
                        <p className="text-sm hidden md:flex">Copyright © 2023 - All right reserved by ARTISTIC.</p>
                        <p className="flex">
                            <FaFacebookF className="pr-3 text-2xl hover:text-[#CF5B32] cursor-pointer" />
                            <FaInstagram className="pr-3 text-3xl hover:text-[#CF5B32] cursor-pointer" />
                            <FaLinkedin className="pr-3 text-3xl hover:text-[#CF5B32] cursor-pointer" />
                            <FaYoutube className="pr-3 text-3xl hover:text-[#CF5B32] cursor-pointer" />
                        </p>
                    </div>
                    <div className="block md:hidden">
                    <div className="divider divider-warning py-4 m-0 "></div></div>
                </div>
                <div className="w-full md:w-2/5 pl-1 md:pl-8">
                    <div className="flex flex-col mb-5">
                        <span className="footer-title text-lg md:text-2xl">Quick Links</span>
                        <ul className="list-dist pl-0 md:pl-3">
                            <li><Link to="/">Home</Link ></li>
                            <li><Link to="/">About</Link ></li>
                            <li><Link to="/instructors">Instructors</Link ></li>
                            <li><Link to="/classes">Courses</Link ></li>
                        </ul>
                    </div>
                    <div className="flex flex-col mb-5">
                        <span className="footer-title text-lg md:text-2xl">Contact Info</span>
                        <div className="pl-0 md:pl-3">
                            <p className="flex items-center mb-2"><IoLocationSharp className="mr-3" /> Rajshahi, Bangladesh</p>
                            <p className="flex items-center mb-2"><FaEnvelopeOpenText className="mr-3" /> nur.murad32@gmail.com</p>
                            <p className="flex items-center mb-2"><FaMobileAlt className="mr-3" />+88 01738115440</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="px-4 block md:hidden bg-[#F2F2F2]">
                <p className="text-sm text-center">Copyright © 2023 - All right reserved by ARTISTIC.</p>
            </div>
        </footer>
    );
};

export default Footer;