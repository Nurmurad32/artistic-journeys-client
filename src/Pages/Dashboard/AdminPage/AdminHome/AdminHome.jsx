import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [] } =
        useQuery(['users'], async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        })

    const { data: classes = [] } =
        useQuery(['classes'], async () => {
            const res = await axiosSecure.get('/classes')
            console.log(res)
            return res.data;

        })

    return (
        <div className='px-4'>
            <Helmet>
                <title>Artistic Journeys || Admin Home</title>
            </Helmet>
            <SectionTitle heading={"Admin Home"}></SectionTitle>
            {/* <p>From Admin Home</p> */}
            <div>
                <div>
                    <h2 className='text-xl text-center text-[#f7a349]'>User Summery</h2>
                </div>

                <div className='grid md:grid-cols-3 gap-6 sm:grid-cols-1 p-8'>
                    <div className="stats shadow bg-[#f7a27177]">
                        <div className="stat">
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value">{users.length}</div>
                            <div className="stat-desc">10% more than last month</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-yellow-100">
                        <div className="stat">
                            <div className="stat-title">Total Instructors</div>
                            <div className="stat-value">{users.filter(user => user.role === 'instructor').length}</div>
                            <div className="stat-desc">Honorable teachers </div>
                        </div>
                    </div>
                    <div className="stats shadow bg-blue-200">
                        <div className="stat">
                            <div className="stat-title">Total Students</div>
                            <div className="stat-value">{users.filter(user => user.role === 'student').length}</div>
                            <div className="stat-desc">Registered </div>
                        </div>
                    </div>
                </div>
                <div className="divider p-4"></div>

                <div>
                    <h2 className='text-xl text-center text-[#f7a349]'>Classes Summery</h2>
                </div>
                <div className='grid md:grid-cols-3 gap-6 sm:grid-cols-1 p-8'>
                    <div className="stats shadow bg-[#d05932be]">
                        <div className="stat">
                            <div className="stat-title">Total Classes</div>
                            <div className="stat-value">{classes.length}</div>
                            <div className="stat-desc">10% more than last month</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-green-300">
                        <div className="stat">
                            <div className="stat-title">Classes Approved</div>
                            <div className="stat-value">{classes.filter(cls => cls.status === 'approved').length}</div>
                            <div className="stat-desc">Approved by Admin </div>
                        </div>
                    </div>
                    <div className="stats shadow bg-red-200">
                        <div className="stat">
                            <div className="stat-title text-red-800">Pending Approved..!!</div>
                            <div className="stat-value">{classes.filter(cls => cls.status === 'pending').length}</div>
                            <div className="stat-desc text-red-800">Need to Approved.. </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;