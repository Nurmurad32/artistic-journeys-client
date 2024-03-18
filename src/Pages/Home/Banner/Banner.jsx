import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import './Banner.css'

import banner1 from '../../../assets/Banner/banner-1.jpg'
import banner2 from '../../../assets/Banner/banner-2.jpg'
import banner3 from '../../../assets/Banner/banner-3.jpg'
import { Link } from "react-router-dom";

import { BsShield } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiGraduationCapLine } from "react-icons/ri";
import { BsBrush } from "react-icons/bs";

import { Fade, Slide } from "react-awesome-reveal";
import CountUp from 'react-countup';


const Banner = () => {
    return (
        <div className="">
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div>
                    <img src={banner1} className="brightness-75 h-auto" />
                    <div className="banner-text">
                        <Slide direction="right">
                            <p className="text-2xl text-white mb-2 md:mb-8 md:text-5xl">Pursue <span className="text-[#FCAF5D]">your</span>Passion. <br />Create your <span className="text-[#FCAF5D]">life.</span> </p>
                        </Slide>
                        <Slide><button className="btn btn-sm btn-wide hover:bg-[#D05A32] bg-[#3d98b5] text-white "><Link to="/classes">EXPLORE OUR PROGRAMS</Link></button></Slide>

                    </div>
                </div>
                <div>
                    <img src={banner2} className="brightness-75" />

                    <div className="banner-text">
                        <Slide direction="right">
                            <p className="text-2xl text-white mb-2 md:mb-8 md:text-5xl"><span className="text-[#FCAF5D]">Founded</span> by Artist and <br /> Supporting <span className="text-[#FCAF5D]">Artist.</span></p>
                        </Slide>
                        <Slide><button className="btn btn-sm md:btn-wide hover:bg-[#D05A32] bg-[#3d98b5] text-white "><Link to="/classes">EXPLORE OUR PROGRAMS</Link></button></Slide>

                    </div>
                </div>
                <div>
                    <img src={banner3} className="brightness-50" />

                    <div className="banner-text">
                        <Slide direction="right">
                            <p className="text-2xl text-white mb-2 md:mb-8 md:text-5xl"><span className="text-[#FCAF5D]">Experiences</span> for the <br />Artist in <span className="text-[#FCAF5D]">you.</span></p>
                        </Slide>
                        <Slide><button className="btn btn-sm md:btn-wide hover:bg-[#D05A32] bg-[#3d98b5] text-white "><Link to="/classes">EXPLORE OUR PROGRAMS</Link></button></Slide>

                    </div>
                </div>
            </Carousel>
            
        </div>
    );
};

export default Banner;