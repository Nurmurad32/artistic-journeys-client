import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const InstructorClasses = () => {
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

    const filterMyClasses = classes.filter((cls) => cls.status === 'approved' && cls.instructoremail === user?.email)
    console.log('filter my class', filterMyClasses)

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
        <div className='w-full'>
            <Helmet>
                <title>Artistic Journeys || All My Classes</title>
            </Helmet>
            <SectionTitle heading={"My Classes"}></SectionTitle>
            <div className="flex justify-between px-8">
                <h3 className="text-xl font-semibold my-4 bg-green-100 p-4 rounded-xl">Total Classes: {classes.length}</h3>
                <h3 className="text-xl font-semibold my-4 bg-red-500 p-4 rounded-xl">Waiting for Approval: {filterMyClasses.length}</h3>
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
                            filterMyClasses.map((cls, index) => <>
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
                                    <td><label className="p-4 rounded m-1 bg-green-600 text-white">{cls.status}</label></td>

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

export default InstructorClasses;