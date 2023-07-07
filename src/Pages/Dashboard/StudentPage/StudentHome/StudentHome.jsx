import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../../hooks/useAuth";
import usePayment from "../../../../hooks/usePayment";
import useCart from "../../../../hooks/useCart";

const StudentHome = () => {
    const { user } = useAuth()
    const [payments, ] = usePayment()
    const [cart, ] = useCart();
    return (
        <div>
            <Helmet>
                <title>Artistic Journeys || Student Home</title>
            </Helmet>
            <SectionTitle heading={"My Home"}></SectionTitle>
            <div className="text-center">
                <p className="text-xl">Hi, <span className="text-2xl px-8 text-[#F7A349]">{user && user?.displayName}</span></p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 sm:grid-cols-1 p-8">
                <div className="stats shadow bg-green-500">
                    <div className="stat">
                        <div className="stat-title">Total Enrolled Classes: </div>
                        <div className="stat-value">{payments.length}</div>
                    </div>
                </div>
                <div className="stats shadow bg-red-500">
                    <div className="stat">
                        <div className="stat-title">Total My Cart:</div>
                        <div className="stat-value"> {cart.length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;