import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
            fetch('http://localhost:3000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
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
        <div className="grid grid-cols-3 gap-4">
            {
                approvedClasses.map(cls => <div key={cls._id} className="card bg-base-100 shadow-xl">
                    <figure><img src={cls.image} alt="Album" /></figure>
                    <div className="card-body justify-between">
                        <div>
                            <h2 className="card-title">{cls.title}</h2>
                            <p>Instructor: <strong>{cls.instructorname}</strong></p>
                            <p>Price: <strong>$ {cls.price}</strong></p>
                            <p>Available Seat: <strong className={cls.seat === 0 ? "bg-red-400" : ""}>{cls.seat === 0 ? "No Seat Available" : cls.seat}</strong></p>
                        </div>
                        <div className="card-actions justify-end">
                            <button onClick={() => handleAddToCard(cls)} className="btn btn-primary" disabled={cls.seat === 0} >Add to Cart</button>
                        </div>
                    </div>
                </div>
                )
            }

        </div>
    );
};

export default Classes;