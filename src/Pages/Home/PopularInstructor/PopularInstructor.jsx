import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Bounce, Fade } from "react-awesome-reveal";


const PopularInstructor = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } =
        useQuery(['users'], async () => {
            const res = await axiosSecure.get('/users')
            console.log(res.data)
            return res.data;
        })
    const filterInstructors = users.filter(user => user.role === 'instructor')
    console.log(filterInstructors)
    return (
        <div className=" pt-8 pb-16 px-8 bg-[#fcaf5d2d] ">
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center my-16">
                    <p><small className="text-[#FCAF5D] text-2xl">Our</small></p>

                    <Bounce><h2 className="text-4xl section-underline p-3">Popular Instructors</h2></Bounce>
                </div>
                <Fade>
                    {/* <div className="grid grid-cols-3 gap-6"> */}
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                    >

                        {
                            filterInstructors.map(user =>
                                <SwiperSlide key={user._id}>
                                    <div className="  p-4 mb-8 flex flex-col justify-center items-center rounded-md">
                                        <figure><img className="h-48 w-48 rounded-full " src={user?.image} alt="Instructor Image" /></figure>
                                        <div className="card-body">
                                            <h2 className="text-center">{user.name}</h2>
                                            <p className="text-center">{user.email}</p>
                                            {/* <p>Gender: {user.gender}</p> */}

                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }


                    </Swiper>
                </Fade>
                {/* </div> */}
                <button className="btn btn-wide hover:bg-[#3d98b5] bg-[#D05A32] text-white mx-auto flex justify-center my-10"><Link to="/instructors">View All Instructors</Link></button>
            </div>
        </div>
    );
};

export default PopularInstructor;