import { Helmet } from "react-helmet-async";
import usePayment from "../../../../hooks/usePayment";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const EnrolledClass = () => {
    const [payments] = usePayment()

    console.log(payments)
    return (
        <div className=''>
            <Helmet>
                <title>Artistic Journeys || Enrolled Classes</title>
            </Helmet>
            <SectionTitle heading={"My Enrolled Class"}></SectionTitle>
            <div className="flex justify-center px-8">
                <h3 className="text-xl font-semibold my-4 bg-green-100 p-4 rounded-xl">Total Enrolled Classes: {payments.length}</h3>
            </div>

            <div className="overflow-x-auto hidden md:block ">
                <table className="table table-sm">
                    {/* head */}
                    <thead>
                        <tr className="text-sm md:text-lg bg-[#D05A32] text-white ">
                            <th>#</th>
                            <th>Title</th>
                            <th>Payment Status</th>
                            <th>TransactionID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        { payments.map((cls, index) => <>
                                <tr key={index + 1}>
                                    <th>{index + 1}</th>
                                    <td>{cls.itemNames}</td>
                                    <td><p className="p-2 rounded-xl bg-green-600 text-white  text-center">{cls.orderStatus}</p></td>
                                    <td><small>{cls.transactionId}</small></td>
                                    
                                    <td >
                                        <p className="p-2 rounded-xl bg-red-600 text-white text-center">Published Soon</p>
                                    </td>
                                </tr>
                            </>
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
                        <tr className="text-sm md:text-lg bg-[#D05A32] text-white ">
                            <th></th>
                            <th>Title</th>
                            <th>Payment Info</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                           payments.map((cls, index) => <>
                                <tr key={index + 1}>
                                    <th>
                                    {index + 1}
                                    </th>
                                    <td>{cls.itemNames}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{cls.orderStatus}</div>
                                                <div className="text-sm opacity-50"><small>{cls.transactionId}</small></div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td >
                                        <p className="p-2 rounded-xl bg-red-600 text-white text-center">Published Soon</p>
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

export default EnrolledClass;