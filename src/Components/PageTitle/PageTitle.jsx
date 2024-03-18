import { Zoom } from 'react-awesome-reveal';
import './PageTitle.css'

const PageTitle = ({ heading, subHeading }) => {
    return (
        <div className=" flex flex-col items-center justify-center mx-auto text-center mb-16 bg-img">
            <Zoom>
                <h3 className="text-3xl md:text-5xl uppercase py-4 text-white brightness-100">{heading}</h3>
            </Zoom>
            <small className="text-black mb-2 text-lg md:text-xl">{subHeading}</small>

        </div>
    );
};

export default PageTitle;