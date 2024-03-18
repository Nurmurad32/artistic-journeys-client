import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';

const AllEnrolled = () => {
    const [axiosSecure] = useAxiosSecure();

    const [classData, setClassData] = useState([]);

    const { data: totalEnrolled = [], refetch } =
        useQuery(['total-student-enrolled'], async () => {
            const res = await axiosSecure.get('/total-student-enrolled')
            return res.data;
        });

    useEffect(() => {
        const fetchClassesData = async () => {
            try {
                const res = await axiosSecure.get('/classes');
                setClassData(res.data);
                refetch()
            } catch (error) {
                console.error('Error fetching classes data:', error);
            }
        };

        fetchClassesData();
    }, []);


    return (
        <div className=' md:px-8'>
            <Helmet>
                <title>Artistic Journeys || Manage Users</title>
            </Helmet>
            <SectionTitle heading={"Admin - Enrolled Students"}></SectionTitle>
            {/* <h3 className="text-3xl font-semibold my-4">Total User: {users.length}</h3> */}
            <div className="overflow-x-auto hidden md:block">
                <table className="table table-xs ">
                    {/* head */}
                    <thead>
                        <tr className="text-xs md:text-sm bg-[#D05A32] text-white ">
                            <th>#</th>
                            <th>image</th>
                            <th>Course Title</th>
                            <th>Instructor</th>
                            <th>Available</th>
                            <th>Enrolled</th>
                            <th>Student Email</th>

                        </tr>
                    </thead>
                    <tbody>
                    {totalEnrolled.map((enrollment, index) => {
                            const correspondingClass = classData.find(cls => cls._id === enrollment._id);
                            if (!correspondingClass) return null; // Skip if corresponding class not found
                            return (
                                <tr key={enrollment._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={correspondingClass?.image} alt="Course Image" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-xs md:text-sm'>{correspondingClass?.title}</td>
                                    <td className='text-xs md:text-sm'>{correspondingClass?.instructorname}</td>
                                    <td className='text-xs md:text-sm'>{correspondingClass?.seat}</td>
                                    <td className='text-xs md:text-sm'>{enrollment?.userEmails.length}</td>
                                    <td className='text-xs md:text-sm'>
                                        <ul className='text-xs md:text-sm'>
                                            {enrollment.userEmails.map(email => (
                                                <li className='text-xs md:text-sm' key={email}><small>{email}</small></li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            );
                        })}

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
                            <th>Course Info</th>
                            <th>Av. & Enr.</th>
                            <th>Student Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            totalEnrolled.map((enrollment, index) =>{
                                const correspondingClass = classData.find(cls => cls._id === enrollment._id);
                                if (!correspondingClass) return null; // Skip if corresponding class not found
                                return (
                                <tr key={index + 1}>
                                    <th className="text-xs md:text-lg">{index + 1}</th>
                                    
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{correspondingClass?.title}</div>
                                                <div className="text-sm opacity-50"><small>{correspondingClass?.instructorname}</small></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">Av.-{correspondingClass?.seat}</div>
                                                <div className="text-sm opacity-50"><small>En.-{enrollment?.userEmails.length}</small></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-xs md:text-sm'>
                                        <ul className='text-xs md:text-sm'>
                                            {enrollment.userEmails.map(email => (
                                                <li className='text-xs md:text-sm' key={email}><small>{email}</small></li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                             ) }
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEnrolled;