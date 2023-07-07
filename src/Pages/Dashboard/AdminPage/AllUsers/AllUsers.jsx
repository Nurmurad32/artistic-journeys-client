import { useQuery } from '@tanstack/react-query'
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } =
        useQuery(['users'], async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        })

    const handleRole = (user, updateRole) => {
        console.log("User:", user);
        console.log("Role:", updateRole);

        const updateUserRole = { role: updateRole }
        axiosSecure.patch(`/users/admin/${user._id}`, updateUserRole)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an ${updateRole} Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/admin/${user._id}`)
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
    return (
        <div className='w-full'>
            <Helmet>
                <title>Artistic Journeys || Manage Users</title>
            </Helmet>
            <SectionTitle heading={"Admin - Manage Users"}></SectionTitle>
            {/* <h3 className="text-3xl font-semibold my-4">Total User: {users.length}</h3> */}
            <div className="">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.image} alt="User Image" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="dropdown dropdown-hover">
                                        {user.role === "student" && (
                                            <>
                                                <label tabIndex={0} className="btn m-1 bg-">{user.role}</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <button onClick={() => handleRole(user, "admin")} className="btn btn-ghost bg-white text-black">admin</button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleRole(user, "instructor")} className="btn btn-ghost bg-white text-black">instructor</button>
                                                    </li>
                                                </ul>
                                            </>
                                        )}

                                        {user.role === "admin" && (
                                            <>
                                                <label tabIndex={0} className="btn m-1 bg-slate-400">{user.role}</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <button onClick={() => handleRole(user, "student")} className="btn btn-ghost bg-white text-black">student</button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleRole(user, "instructor")} className="btn btn-ghost bg-white text-black">instructor</button>
                                                    </li>
                                                </ul>
                                            </>
                                        )}

                                        {user.role === "instructor" && (
                                            <>
                                                <label tabIndex={0} className="btn m-1 bg-green-400">{user.role}</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <button onClick={() => handleRole(user, "admin")} className="btn btn-ghost bg-white text-black">admin</button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleRole(user, "student")} className="btn btn-ghost bg-white text-black">student</button>
                                                    </li>
                                                </ul>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button>
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

export default AllUsers;