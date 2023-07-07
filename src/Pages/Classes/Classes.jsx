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

    const approvedClasses = classes.filter(cls => cls.status === 'approved')
    console.log(approvedClasses)
    return (
        <div className="mb-16">
            <Helmet>
                <title>Artistic Journeys || All Courses</title>
            </Helmet>
            <PageTitle heading={"Classes"} subHeading={"Home > Classes"}></PageTitle>
            <div className="text-center my-16">
                <Bounce>
                    <p><small className="text-[#FCAF5D] text-xl">All Our</small></p>
                    <h2 className="text-4xl"> Courses</h2>
                </Bounce>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <Fade delay={2}>
                    {
                        approvedClasses.map(cls =>
                            <ClassesCard key={cls._id} cls={cls} handleAddToCard={handleAddToCard}></ClassesCard>
                        )
                    }
                </Fade>
            </div>

        </div>
    );
};

export default Classes;