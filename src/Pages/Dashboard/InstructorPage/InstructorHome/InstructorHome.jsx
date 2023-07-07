import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ClassesCard from "../../../Shared/ClassesCard/ClassesCard"

const InstructorHome = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure();

    const { data: classes = [] } =
        useQuery(['classes'], async () => {
            const res = await axiosSecure.get('/classes')
            console.log(res)
            return res.data;

        })
    console.log(user)
    return (
        <div>
            <Helmet>
                <title>Artistic Journeys || Instructor Home</title>
            </Helmet>
            <SectionTitle heading={"Instructor Home"}></SectionTitle>
            <div className="text-center">
                <p className="text-xl">Hi, <span className="text-2xl px-8 text-[#F7A349]">{user && user?.displayName}</span></p>
            </div>
            <div className='grid md:grid-cols-2 gap-6 sm:grid-cols-1 p-8'>
                <div className="stats shadow bg-green-500">
                    <div className="stat">
                        <div className="stat-title">All My Classes</div>
                        <div className="stat-value">{classes.filter((cls) => cls.instructoremail === user?.email).length}</div>
                        <div className="stat-desc">10% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow bg-red-500">
                    <div className="stat">
                        <div className="stat-title">Waiting for Approval</div>
                        <div className="stat-value">{classes.filter((cls) => cls.status === 'pending' && cls.instructoremail === user?.email).length}</div>
                        <div className="stat-desc">10% more than last month</div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-center text-3xl text-[#F7A349]">All Seat Booked Classes</h2>
                <div className="grid md:grid-cols-2 gap-6 sm:grid-cols-1 p-8">
                    {classes.filter((cls) => cls.seat === 0 && cls.instructoremail === user?.email).map(cls => <ClassesCard key={cls._id} cls={cls}></ClassesCard>)}
                </div>
            </div>
        </div>
    );
};

export default InstructorHome;