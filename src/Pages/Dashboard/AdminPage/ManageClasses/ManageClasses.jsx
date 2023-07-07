import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: classes = [], refetch } =
        useQuery(['classes'], async () => {
            const res = await axiosSecure.get('/classes')
            return res.data;
        })

    const handleRole = (cls, updateStatus) => {
        console.log(cls, updateStatus, cls._id)
        const updateClassStatus = { status: updateStatus }
        axiosSecure.patch(`/classes/admin/${cls._id}`, updateClassStatus)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${cls.title} Class is Approved`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

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

                axiosSecure.delete(`/classes/admin/${cls._id}`)
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

    const filterPending = classes.filter((cls) => cls.status === 'pending')
    console.log(filterPending)
    return (
        <div className='w-full'>
            <Helmet>
                <title>Artistic Journeys || Manage Classes</title>
            </Helmet>
            <SectionTitle heading={"Admin - Manage Classes"}></SectionTitle>
            <div className="flex justify-between px-8">
                <h3 className="text-xl font-semibold my-4 bg-green-100 p-4 rounded-xl">Total Classes: {classes.length}</h3>
                <h3 className="text-xl font-semibold my-4 bg-red-500 p-4 rounded-xl">Need to Approved: {filterPending.length}</h3>
            </div>

            <div className="">
                <table className="table mt-8">
                    {/* head */}
                    <thead>
                        <tr className="text-xl ">
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Instructor Email</th>
                            <th>Seat</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            classes.map((cls, index) =>
                                <tr key={cls._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={cls.image} alt="Image of this class" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{cls.title}</td>
                                    <td>{cls.instructoremail}</td>
                                    <td className={`${cls.seat === 0 && "text-red-500"}`}>{cls.seat}</td>
                                    <td>{cls.price}</td>
                                    <td className="dropdown dropdown-hover flex self-center items-center">
                                        {cls.status === 'approved'
                                            ? <label tabIndex={0} className="btn btn-ghost m-1 bg-green-600 text-white">{cls.status}</label>
                                            :
                                            <>
                                                <label tabIndex={0} className="btn btn-ghost m-1 bg-orange-600 text-white">{cls.status}</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <button onClick={() => handleRole(cls, "approved")} className="btn btn-ghost bg-white text-black flex pt-4">Approved</button>
                                                    </li>
                                                </ul>
                                            </>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(cls)} className="btn btn-ghost bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;