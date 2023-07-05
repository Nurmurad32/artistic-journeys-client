import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Artistic Journeys || Home</title>
            </Helmet>
            <Banner></Banner>
        </>
    );
};

export default Home;