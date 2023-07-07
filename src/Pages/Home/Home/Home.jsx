import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularCourses from "../PopularCourses/PopularCourses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Artistic Journeys || Home</title>
            </Helmet>
            <Banner></Banner>
            <PopularCourses></PopularCourses>
            <PopularInstructor></PopularInstructor>
            <Testimonial></Testimonial>
        </>
    );
};

export default Home;