import { Link } from "react-router-dom";
import img from "../../assets/404-error-template-3.webp"

const NotFound = () => {
    return (
        <div>
            <img className="h-5/6" src={img} alt="" />
            <button className="text-center mx-auto flex justify-center"><Link to="/"> Back to home </Link></button>
        </div>
    );
};

export default NotFound;