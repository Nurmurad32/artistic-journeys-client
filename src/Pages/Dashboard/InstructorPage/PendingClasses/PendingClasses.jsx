import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';

const PendingClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    const { data: classes = [], refetch } =
        useQuery(['classes'], async () => {
            const res = await axiosSecure.get('/classes')
            return res.data;
        })
    console.log(classes)
    // const filterApproved = classes.filter((cls) => cls.status === 'approved')
    // console.log(filterApproved)

    const pendingClasses = classes.filter((cls) => cls.status === 'pending' && cls.instructoremail === user?.email)
    console.log('filter my pending class', pendingClasses)

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
    return (
        <div className=' md:px-8'>
            <Helmet>
                <title>Artistic Journeys || Pending Classes</title>
            </Helmet>
            <SectionTitle heading={"Waiting For Approval"}></SectionTitle>


            <div className="overflow-x-auto hidden md:block">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr className="text-sm md:text-lg bg-[#D05A32] text-white ">
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
                            pendingClasses.map((cls, index) => <>
                                <tr key={cls._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={cls.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-xs md:text-sm">{cls.title}</td>
                                    <td className='text-wrap'>{cls.instructoremail}</td>
                                    <td className="text-xs md:text-sm">{cls.seat}</td>
                                    <td className="text-xs md:text-sm">{cls.price}</td>
                                    <td className="text-xs md:text-sm"><p className="p-2 rounded m-1 bg-orange-600 text-white">{cls.status}</p></td>
                                    <td>
                                        <p onClick={() => handleDelete(cls)} className="text-red-600"><FaTrashAlt></FaTrashAlt></p>
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
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            pendingClasses.map((cls, index) => <>
                                <tr key={cls._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={cls.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-xs md:text-sm">{cls.title}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">$ {cls.price}</div>
                                                <div className="text-sm opacity-50">Se.:{cls.seat}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-xs md:text-sm"><p className="p-2 rounded m-1 bg-orange-600 text-white">{cls.status}</p></td>
                                    <td>
                                        <p onClick={() => handleDelete(cls)} className="text-red-600"><FaTrashAlt></FaTrashAlt></p>
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

export default PendingClasses;