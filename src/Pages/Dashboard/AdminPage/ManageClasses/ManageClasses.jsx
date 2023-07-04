import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: classes = [], refetch } =
        useQuery(['classes'], async () => {
            const res = await axiosSecure.get('/classes')
            return res.data;
        })

    const handleRole = (cls, updateStatus) => {
        const updateClassStatus = { status: updateStatus }
        fetch(`http://localhost:3000/classes/admin/${cls._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateClassStatus)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "Change Status to Approved",
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
            <div className="flex justify-between px-8">
                <h3 className="text-3xl font-semibold my-4">Total Classes: {classes.length}</h3>
                <h3 className="text-3xl font-semibold my-4">Need to Approved: {filterPending.length}</h3>
            </div>

            <div className="">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
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
                            classes.map((cls, index) => <>
                                <tr key={cls._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={cls.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{cls.title}</td>
                                    <td>{cls.instructoremail}</td>
                                    <td>{cls.seat}</td>
                                    <td>{cls.price}</td>
                                    <td className="dropdown dropdown-hover">
                                        {cls.status === 'approved'
                                            ? <label tabIndex={0} className="btn m-1 bg-green-600 text-white">{cls.status}</label>
                                            :
                                            <>
                                                <label tabIndex={0} className="btn m-1 bg-orange-600 text-white">{cls.status}</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <button onClick={() => handleRole(cls, "approved")} className="btn btn-ghost bg-white text-black">Approved</button>
                                                    </li>
                                                </ul>
                                            </>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(cls)} className="btn btn-ghost bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>
                            </>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;