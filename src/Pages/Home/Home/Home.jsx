import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularCourses from "../PopularCourses/PopularCourses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Testimonial from "../Testimonial/Testimonial";
import WhyUs from "../WhyUs/WhyUs";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Artistic Journeys || Home</title>
            </Helmet>
            <Banner></Banner>
            <div className="max-w-screen-xl mx-auto">
                <WhyUs></WhyUs>
                <PopularCourses></PopularCourses>
            </div>
            <PopularInstructor></PopularInstructor>
            <Testimonial></Testimonial>
        </>
    );
};

export default Home;