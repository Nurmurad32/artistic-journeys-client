import { Helmet } from "react-helmet-async";
import usePayment from "../../../../hooks/usePayment";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const EnrolledClass = () => {
    const [payments, refetch] = usePayment()

    console.log(payments)
    return (
        <div className='w-full'>
            <Helmet>
                <title>Artistic Journeys || Enrolled Classes</title>
            </Helmet>
            <SectionTitle heading={"My Enrolled Class"}></SectionTitle>
            <div className="flex justify-center px-8">
                <h3 className="text-xl font-semibold my-4 bg-green-100 p-4 rounded-xl">Total Enrolled Classes: {payments.length}</h3>
            </div>

            <div className="">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Payment Status</th>
                            <th>TransactionID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments.map((cls, index) => <>
                                <tr key={cls._id}>
                                    <th>{index + 1}</th>
                                    <td>{cls.itemNames}</td>
                                    <td><button className="btn btn-ghost bg-green-600 text-white">{cls.orderStatus}</button></td>
                                    <td>{cls.transactionId}</td>
                                    
                                    <td>
                                        <button className="btn btn-ghost bg-red-600 text-white">Published Soon</button>
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

export default EnrolledClass;