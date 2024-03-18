import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PageTitle from "../../Components/PageTitle/PageTitle";
import ClassesCard from "../Shared/ClassesCard/ClassesCard";
import { Helmet } from "react-helmet-async";
import { Bounce, Fade } from "react-awesome-reveal";

const Classes = () => {
    const { user } = useAuth();
    // const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [axiosSecure] = useAxiosSecure();

    const { data: classes = [], refetch } =
        useQuery(['classes'], async () => {
            const res = await axiosSecure.get('/classes')
            console.log(res)
            return res.data;

        })

    const handleAddToCard = (cls) => {
        console.log(cls)

        if (user && user.email) {
            const cartItem = {
                classItemId: cls._id, title: cls.title, image: cls.image, price: cls.price, email: user.email, instructorname: cls.instructorname
            }
            // fetch('http://localhost:3000/carts', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(cartItem)
            // })
            //     .then(res => res.json())
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${cls.title} added on your cart`,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                    refetch()
                })
        }
        else {
            Swal.fire({
                title: 'Please login to enrolled your class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    const { data: users = [] } =
        useQuery(['users'], async () => {
            const usersIn = await axiosSecure.get('/users')
            console.log(usersIn.data)
            return usersIn.data;
        })
    const filterInstructors = users.filter(user => user.role === 'instructor')
    console.log(filterInstructors)

    const approvedClasses = classes.filter(cls => cls.status === 'approved')
    console.log(approvedClasses)
    return (
        <div className="mb-16">
            <Helmet>
                <title>Artistic Journeys || All Courses</title>
            </Helmet>
            <PageTitle heading={"Courses"} subHeading={"Home > Courses"}></PageTitle>
            {/* <div className="text-center my-16">
                <Bounce>
                    <p><small className="text-[#FCAF5D] text-xl">All Our</small></p>
                    <h2 className="text-4xl"> Courses</h2>
                </Bounce>
            </div> */}

            <div className=" ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-screen-xl mx-auto p-3 md:p-0">
                    <Fade delay={2}>
                        {
                            approvedClasses.map(cls =>
                                <ClassesCard key={cls._id} cls={cls} handleAddToCard={handleAddToCard} filterInstructors={filterInstructors}></ClassesCard>
                            )
                        }
                    </Fade>
                </div>
            </div>

        </div>
    );
};

export default Classes;