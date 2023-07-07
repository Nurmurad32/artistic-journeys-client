import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ClassesCard from "../../Shared/ClassesCard/ClassesCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { Bounce, Fade } from "react-awesome-reveal";



const PopularCourses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();


    const { data: classes = [], refetch } =
        useQuery(['classes'], async () => {
            const res = await axiosSecure.get('/class-status')
            const result = (res.data)
            return result;

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

    return (
        <div>
            <div className="text-center my-16">
                <p><small className="text-[#FCAF5D] text-xl">Our</small></p>
                <Bounce><h2 className="text-4xl">Popular Courses</h2></Bounce>
                
            </div>
            <Fade>
            <div className="grid grid-cols-3 gap-6">
                {
                    classes.slice(0, 6).map(cls =>
                        <ClassesCard key={cls.classItemId} cls={cls.classItem} handleAddToCard={handleAddToCard}></ClassesCard>
                    )
                }

            </div>
            </Fade>
           
            <button className="btn btn-wide hover:bg-[#3d98b5] bg-[#D05A32] text-white mx-auto flex justify-center my-10"><Link to="/classes">View all Classes</Link></button>

        </div>
    );
};

export default PopularCourses;