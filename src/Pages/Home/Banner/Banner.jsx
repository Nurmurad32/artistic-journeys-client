import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import bannerBg from '../../../assets/hero_home_01.jpg'


const Banner = () => {
    return (
        <div className="bg-[url('../../../assets/hero_home_01.jpg')]">

        
        <Carousel showThumbs={false}>
            <div>
                <img src={bannerBg} />
                <div className="flex absolute top-10 z-10">
                    <p className="">Legend 1</p>
                    <p className="">Legend 1</p>
                </div>

            </div>
            <div>
                <img src={bannerBg} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={bannerBg} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
        </div>
    );
};

export default Banner;