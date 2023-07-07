import { Zoom } from 'react-awesome-reveal';
import './PageTitle.css'

const PageTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center mb-16 bg-img">
            <Zoom>
                <h3 className="text-5xl uppercase py-4 text-white brightness-100 pt-56">{heading}</h3>
                </Zoom>
                <small className="text-[#fcaf5d] mb-2">{subHeading}</small>
            
        </div>
    );
};

export default PageTitle;