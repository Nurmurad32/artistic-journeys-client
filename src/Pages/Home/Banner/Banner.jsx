import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import './Banner.css'

import banner1 from '../../../assets/Banner/banner-1.jpg'
import banner2 from '../../../assets/Banner/banner-2.jpg'
import banner3 from '../../../assets/Banner/banner-3.jpg'
import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div className="">
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div>
                    <img src={banner1} className="brightness-75" />
                    <div className="banner-text">
                        <p className="text-5xl text-white mb-8">Pursue <span className="text-[#FCAF5D]">your</span>Passion. <br />Create your <span className="text-[#FCAF5D]">life.</span> </p>
                        <button className="btn btn-wide hover:bg-[#D05A32] bg-[#3d98b5] text-white "><Link to="/classes">EXPLORE OUR PROGRAMS</Link></button>
                    </div>
                </div>
                <div>
                    <img src={banner2} className="brightness-75" />
                    <div className="banner-text">
                        <p className="text-5xl text-white mb-8"><span className="text-[#FCAF5D]">Founded</span> by Artist and <br /> Supporting <span className="text-[#FCAF5D]">Artist.</span></p>
                        <button className="btn btn-wide hover:bg-[#D05A32] bg-[#3d98b5] text-white "><Link to="/classes">EXPLORE OUR PROGRAMS</Link></button>
                    </div>
                </div>
                <div>
                    <img src={banner3} className="brightness-50" />
                    <div className="banner-text">
                        <p className="text-5xl text-white mb-8"><span className="text-[#FCAF5D]">Experiences</span> for the <br />Artist in <span className="text-[#FCAF5D]">you.</span></p>
                        <button className="btn btn-wide hover:bg-[#D05A32] bg-[#3d98b5] text-white "><Link to="/classes">EXPLORE OUR PROGRAMS</Link></button>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;