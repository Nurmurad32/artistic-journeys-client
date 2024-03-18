import { TbPointFilled } from "react-icons/tb";

const CourseModal = ({ details, id }) => {
return (
    <dialog id={id} className="modal">
        <div className="modal-box">
            <form method="dialog" className="m-0">
                {/* if there is a button in form, it will close the modal */}

                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg text-center mb-6">{details?.title}</h3>
            <div>
                <p>You have learn this from this course:</p>
                <ul className="p-4 list-disc">
                    {
                        details?.classdes.split(",").map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </dialog>
);
};

export default CourseModal;