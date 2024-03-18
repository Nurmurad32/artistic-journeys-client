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
        <div className='md:px-8'>
            <Helmet>
                <title>Artistic Journeys || Manage Users</title>
            </Helmet>
            <SectionTitle heading={"Admin - Manage Users"}></SectionTitle>
            {/* <h3 className="text-3xl font-semibold my-4">Total User: {users.length}</h3> */}
            <div className="overflow-x-auto hidden md:block">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-xs md:text-sm bg-[#D05A32] text-white ">
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
                                    <td className='text-xs md:text-sm'>{user?.name}</td>
                                    <td className='text-xs md:text-sm'><small>{user?.email}</small></td>
                                    <td className="dropdown dropdown-hover">
                                        <small>
                                            {user?.role === "student" && (
                                                <>
                                                    <label tabIndex={0} className="m-1 p-1 rounded-md bg-">{user?.role}</label>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                                        <li>
                                                            <p onClick={() => handleRole(user, "admin")} className=" bg-white text-black">admin</p>
                                                        </li>
                                                        <li>
                                                            <p onClick={() => handleRole(user, "instructor")} className=" bg-white text-black">instructor</p>
                                                        </li>
                                                    </ul>
                                                </>
                                            )}

                                            {user?.role === "admin" && (
                                                <>
                                                    <label tabIndex={0} className="m-1 p-1 rounded-md text-white bg-slate-400">{user?.role}</label>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box ">
                                                        <li>
                                                            <p onClick={() => handleRole(user, "student")} className=" bg-white text-black">student</p>
                                                        </li>
                                                        <li>
                                                            <p onClick={() => handleRole(user, "instructor")} className=" bg-white text-black">instructor</p>
                                                        </li>
                                                    </ul>
                                                </>
                                            )}

                                            {user?.role === "instructor" && (
                                                <>
                                                    <label tabIndex={0} className="m-1 p-1 rounded-md bg-green-400">{user?.role}</label>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                                        <li>
                                                            <p onClick={() => handleRole(user, "admin")} className=" bg-white text-black">admin</p>
                                                        </li>
                                                        <li>
                                                            <p onClick={() => handleRole(user, "student")} className=" bg-white text-black">student</p>
                                                        </li>
                                                    </ul>
                                                </>
                                            )}
                                        </small>
                                    </td>
                                    <td className=''>
                                        <p onClick={() => handleDelete(user)} className=" text-red-600"><FaTrashAlt></FaTrashAlt></p>
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
                            <th>#</th>
                            <th>image</th>
                            <th>Info</th>
                            <th>Role</th>
                            <th>Act.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <>
                                <tr key={index + 1}>
                                    <th className="text-xs md:text-lg">{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={user.image} alt="Image of this class" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-sm opacity-50"><small>{user.email}</small></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="dropdown dropdown-hover">
                                        <small>
                                            {user?.role === "student" && (
                                                <>
                                                    <label tabIndex={0} className="m-1 p-1 rounded-md bg-">{user?.role}</label>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                                        <li>
                                                            <p onClick={() => handleRole(user, "admin")} className=" bg-white text-black">admin</p>
                                                        </li>
                                                        <li>
                                                            <p onClick={() => handleRole(user, "instructor")} className=" bg-white text-black">instructor</p>
                                                        </li>
                                                    </ul>
                                                </>
                                            )}

                                            {user?.role === "admin" && (
                                                <>
                                                    <label tabIndex={0} className="m-1 p-1 rounded-md text-white bg-slate-400">{user?.role}</label>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box ">
                                                        <li>
                                                            <p onClick={() => handleRole(user, "student")} className=" bg-white text-black">student</p>
                                                        </li>
                                                        <li>
                                                            <p onClick={() => handleRole(user, "instructor")} className=" bg-white text-black">instructor</p>
                                                        </li>
                                                    </ul>
                                                </>
                                            )}

                                            {user?.role === "instructor" && (
                                                <>
                                                    <label tabIndex={0} className="m-1 p-1 rounded-md bg-green-400">{user?.role}</label>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                                        <li>
                                                            <p onClick={() => handleRole(user, "admin")} className=" bg-white text-black">admin</p>
                                                        </li>
                                                        <li>
                                                            <p onClick={() => handleRole(user, "student")} className=" bg-white text-black">student</p>
                                                        </li>
                                                    </ul>
                                                </>
                                            )}
                                        </small>
                                    </td>
                                    <td className=''>
                                        <p onClick={() => handleDelete(user)} className=" text-red-600"><FaTrashAlt></FaTrashAlt></p>
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

export default AllUsers;