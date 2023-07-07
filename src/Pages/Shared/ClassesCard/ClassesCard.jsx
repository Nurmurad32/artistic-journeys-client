import useAdminOrInstructor from "../../../hooks/useAdminOrInstructor";

const ClassesCard = ({ cls, handleAddToCard }) => {
    const [isAdminOrInstructor] = useAdminOrInstructor();
    return (
        <div className="card bg-base-100 shadow-xl ">
            <figure><img src={cls?.image} alt="Album" className="h-72 w-full"/></figure>
            <div className="card-body justify-between">
                <div>
                    <h2 className="card-title justify-center mb-4">{cls?.title}</h2>
                    <p>Instructor: <strong className="text-[#D05A32]">{cls?.instructorname}</strong> </p>
                    <p>Price: <strong className="text-[#D05A32]">$ {cls?.price}</strong></p>
                    <p>Available Seat: <strong className={cls?.seat === 0 ? "bg-red-400 " : "text-[#D05A32]"}>{cls?.seat === 0 ? "No Seat Available" : cls?.seat}</strong></p>
                </div>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCard(cls)} className="btn btn-primary hover:bg-[#D05A32] bg-[#3d98b5] text-white" disabled={isAdminOrInstructor === 'admin' || isAdminOrInstructor === 'instructor' || cls?.seat === 0 } >Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;