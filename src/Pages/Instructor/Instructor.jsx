import { Helmet } from "react-helmet-async";
import PageTitle from "../../Components/PageTitle/PageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Bounce, Fade } from "react-awesome-reveal";

const Instructor = () => {
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
        <div className="mb-16">
            <Helmet>
                <title>Artistic Journeys || Instructors</title>
            </Helmet>
            <PageTitle heading={"Instructors"} subHeading={"Home > Instructors"}></PageTitle>
            <div className="text-center my-16">
                <Bounce>
                    <p><small className="text-[#FCAF5D] text-xl">All Our</small></p>
                    <h2 className="text-4xl"> Instructors</h2>
                </Bounce>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <Fade delay={2}>
                    {
                        filterInstructors.map(user =>

                            <div key={user._id} className="card card-side  bg-base-100 shadow-xl p-4 mb-8">
                                <figure><img className="h-48 w-48 rounded-full " src={user?.image} alt="Instructor Image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{user.name}</h2>
                                    <p>{user.email}</p>
                                    <p>Gender: {user.gender}</p>

                                </div>
                            </div>
                        )
                    }

                </Fade>
            </div>
        </div>
    );
};

export default Instructor;