import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const SelectedClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    console.log(cart)

    const handleDelete = cls => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this class?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${cls._id}`)
                    .then(res => {
                        console.log('deleted response', res.data);

                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    const handlePay = (cls) => {
        navigate('/dashboard/payment', { state: { title: cls.title, price: cls.price, cart_id: cls._id, classItemId: cls.classItemId } })
    }
    return (
        <div className=''>
            <Helmet>
                <title>Artistic Journeys || Selected Classes</title>
            </Helmet>
            <SectionTitle heading={"My Selected Class"}></SectionTitle>
            {/* <div className="flex justify-between px-8">
                <h3 className="text-3xl font-semibold my-4">Total Classes: {cart.length}</h3>

            </div> */}

            <div className="overflow-x-auto hidden md:block">
                <table className="table table-sm">
                    {/* head */}
                    <thead>
                        <tr className="text-sm md:text-lg bg-[#D05A32] text-white ">
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            {/* <th>Instructor Name</th> */}
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((cls, index) => <>
                                <tr key={cls._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={cls.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{cls.title}</td>
                                    {/* <td>{cls.instructorname}</td> */}
                                    <td>{cls.price}</td>
                                    <td>
                                        {/* <Link to='/dashboard/payment'>
                                            <label onClick={handlePay} className="p-4 rounded m-1 bg-yellow-600 text-white">PAY</label>
                                        </Link> */}
                                        <label onClick={() => handlePay(cls)} className="px-3 py-2 rounded m-1 bg-yellow-600 text-white text-center">PAY</label>
                                    </td>
                                    <td>
                                        <p onClick={() => handleDelete(cls)} className=" text-red-600 cursour"><FaTrashAlt></FaTrashAlt></p>
                                    </td>
                                </tr>
                            </>
                            )
                        }

                    </tbody>
                </table>
            </div>
            {/* For Mobile */}
            <div className="overflow-x-auto block md:hidden">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr className="text-sm md:text-lg bg-[#D05A32] text-white ">
                            <th></th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Pay</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((cls, index) => <>
                                <tr key={cls._id}>
                                    <th>
                                    {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{cls.title}</div>
                                                <div className="text-sm opacity-50">Ins.:{cls.instructorname}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{cls.price}</td>
                                    <td>
                                        <p onClick={() => handlePay(cls)} className="px-3 py-2 rounded m-1 bg-yellow-600 text-white text-center">PAY</p>
                                    </td>
                                    <td className="text-center ">
                                        <p onClick={() => handleDelete(cls)} className=" text-red-600 cursour"><FaTrashAlt></FaTrashAlt></p>
                                    </td>
                                </tr>
                            </>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClass;