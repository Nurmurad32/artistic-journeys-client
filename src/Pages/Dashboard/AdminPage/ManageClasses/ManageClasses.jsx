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
        <div className='md:px-8'>
            <Helmet>
                <title>Artistic Journeys || Manage Classes</title>
            </Helmet>
            <SectionTitle heading={"Admin - Manage Classes"}></SectionTitle>
            {/* <div className="flex flex-col md:flex-row justify-center md:justify-between">
                <h3 className="text-xs md:text-2xl font-semibold my-4 bg-green-100 p-4 rounded-xl">Total Classes: {classes.length}</h3>
                <h3 className="text-xs md:text-2xl font-semibold my-4 bg-red-500 p-4 rounded-xl">Need to Approved: {filterPending.length}</h3>
            </div> */}

            <div className="overflow-x-auto hidden md:block">
                <table className="table table-xs ">
                    {/* head */}
                    <thead>
                        <tr className="text-xs md:text-sm bg-[#D05A32] text-white ">
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
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={cls.image} alt="Image of this class" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-xs md:text-sm">{cls.title}</td>
                                    <td className="text-xs md:text-sm"><small>{cls.instructoremail}</small></td>
                                    <td className={`${cls.seat === 0 && "text-red-500"} text-xs md:text-sm`}>{cls.seat}</td>
                                    <td className="text-xs md:text-sm">{cls.price}</td>
                                    <td className="dropdown dropdown-hover flex self-center items-center text-xs md:text-sm">
                                        {cls.status === 'approved'
                                            ? <label tabIndex={0} className="p-2 rounded-sm bg-green-600 text-white">{cls.status}</label>
                                            :
                                            <>
                                                <label tabIndex={0} className="p-2 rounded-sm bg-orange-600 text-white">{cls.status}</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28">
                                                    <li>
                                                        <p onClick={() => handleRole(cls, "approved")} className=" bg-white text-black flex">Approved</p>
                                                    </li>
                                                </ul>
                                            </>
                                        }
                                    </td>
                                    <td>
                                        <p onClick={() => handleDelete(cls)} className=" text-red-600 text-xs md:text-sm"><FaTrashAlt></FaTrashAlt></p>
                                    </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>
            {/* For mobile */}
            <div className="overflow-x-auto block md:hidden">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr className="text-xs md:text-lg bg-[#D05A32] text-white ">
                            <th></th>
                            <th>Image</th>
                            <th>Info</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                           classes.map((cls, index) => <>
                                <tr key={index + 1}>
                                    <th className="text-xs md:text-lg">{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={cls.image} alt="Image of this class" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{cls.title}</div>
                                                <div className="text-sm opacity-50"><small>{cls.instructoremail}</small></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{cls.price}</div>
                                                <div className={`${cls.seat === 0 && "text-red-500"}text-sm opacity-50`}><small>{cls.seat}</small></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="dropdown dropdown-hover flex self-center items-center text-xs md:text-sm">
                                        {cls.status === 'approved'
                                            ? <label tabIndex={0} className="p-1 rounded-sm bg-green-600 text-white">{cls.status}</label>
                                            :
                                            <>
                                                <label tabIndex={0} className="p-1 rounded-sm bg-orange-600 text-white">{cls.status}</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-24 p-1">
                                                    <li>
                                                        <p onClick={() => handleRole(cls, "approved")} className=" bg-white text-black flex p-1"><small>Approved</small></p>
                                                    </li>
                                                </ul>
                                            </>
                                        }
                                    </td>
                                    <td>
                                        <p onClick={() => handleDelete(cls)} className=" text-red-600 text-xs md:text-sm"><FaTrashAlt></FaTrashAlt></p>
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

export default ManageClasses;