import './Testimonial.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Bounce } from 'react-awesome-reveal';

const Testimonial = () => {
    return (
        <div className='testimonial-bg'>
            <div className="text-center py-20">
                <p><small className="text-[#FCAF5D] text-2xl">Testimonials</small></p>
                <Bounce> <h2 className="text-4xl text-white section-underline p-3">What Our Students Say</h2></Bounce>
               
            </div>
            <div>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='w-4/6 text-center mx-auto mb-8'>
                            <p className='text-white'>I love teaching and interacting with students. It’s so fascinating to share all my experience and knowledge with this talented people!</p>
                            <img className='rounded-full mx-auto' width="150" height="150" src="https://crown-art.ancorathemes.com/wp-content/uploads/2017/03/image-35-200x200.jpg" />
                            <h4 className='text-[#FCAF5D]'>Paula Patton</h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-4/6 text-center mx-auto mb-8'>
                            <p className='text-white'>I love teaching and interacting with students. It’s so fascinating to share all my experience and knowledge with this talented people!</p>
                            <img className='rounded-full mx-auto' width="150" height="150" src="https://crown-art.ancorathemes.com/wp-content/uploads/2017/03/image-38-200x200.jpg" />
                            <h4 className='text-[#FCAF5D]'>Travis Fimmel</h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-4/6 text-center mx-auto mb-8'>
                            <p className='text-white'>I love teaching and interacting with students. It’s so fascinating to share all my experience and knowledge with this talented people!</p>
                            <img className='rounded-full mx-auto' width="150" height="150" src="https://crown-art.ancorathemes.com/wp-content/uploads/2017/03/image-37-200x200.jpg" />
                            <h4 className='text-[#FCAF5D]'>Anna Gill</h4>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;