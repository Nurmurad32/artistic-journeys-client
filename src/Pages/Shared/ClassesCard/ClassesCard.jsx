import useAdminOrInstructor from "../../../hooks/useAdminOrInstructor";
import CourseModal from "./CourseModal";

const ClassesCard = ({ cls, handleAddToCard, filterInstructors }) => {
    // console.log(cls)
    const [isAdminOrInstructor] = useAdminOrInstructor();

    const instructorInfo = filterInstructors?.find(instruct => cls?.instructoremail === instruct?.email)
    // console.log(instructorInfo)

    const showCourseDetails = () => {

        console.log("showCourseDetails function called");
        document.getElementById('my_modal_2').showModal()
    }

    return (
        <div className="card bg-base-100 shadow-xl ">
            <figure><img src={cls?.image} alt="Album" className="h-60 w-full" /></figure>
            <div className="card-body justify-between">
                <div>
                    <h2 className="card-title justify-center mb-4">{cls?.title}</h2>
                </div>
                <div className="flex items-center align-end">
                    <img src={instructorInfo?.image} alt="" className="h-10 w-10 rounded-full mr-4"/>
                    <p><strong className="text-[#D05A32]">{cls?.instructorname}</strong> </p>
                </div>
                <div>
                    <p>Price: <strong className="text-[#D05A32]">$ {cls?.price}</strong></p>
                    <p>Seat: <strong className={cls?.seat === 0 ? "bg-red-400 " : "text-[#D05A32]"}>{cls?.seat === 0 ? "No Seat Available" : cls?.seat}</strong></p>
                </div>
                <div className="card-actions justify-between">
                    <button onClick={showCourseDetails} className="btn btn-sm bg-[#3f3835] hover:bg-[#3d98b5] text-white" disabled={isAdminOrInstructor === 'admin' || isAdminOrInstructor === 'instructor' || cls?.seat === 0} >Details</button>
                    <button onClick={() => handleAddToCard(cls)} className="btn btn-sm hover:bg-[#D05A32] bg-[#3d98b5] text-white" disabled={isAdminOrInstructor === 'admin' || isAdminOrInstructor === 'instructor' || cls?.seat === 0} >Add to Cart</button>
                </div>
                <CourseModal details={cls} id="my_modal_2" />
            </div>
        </div>
    );
};

export default ClassesCard;