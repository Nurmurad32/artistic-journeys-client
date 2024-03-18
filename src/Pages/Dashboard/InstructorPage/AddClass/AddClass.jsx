import { useForm } from "react-hook-form";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
    const [axiosSecure] = useAxiosSecure()
    const { user } = useAuth()

    // console.log(user)

    const { register, reset, handleSubmit, formState: { errors }, } = useForm()

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = (data) => {
        console.log(data)

        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { title, price, seat, classdes } = data
                    const newItem = {
                        title,
                        instructorname: user.displayName,
                        instructoremail: user.email,
                        price: parseFloat(price),
                        seat: parseInt(seat),
                        classdes,
                        image: imgURL,
                        status: 'pending'
                    }
                    console.log(newItem);
                    axiosSecure.post('/classes', newItem)
                        .then(data => {
                            console.log('after posting new item', data.data)
                            if (data.data.insertedId) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Class Added Successfully waiting for Approval',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                                reset()
                            }
                        })

                }
            })

    }
    return (
        <div className=" md:px-10">
            <Helmet>
                <title>Artistic Journeys || Add A Class</title>
            </Helmet>
            <SectionTitle heading={"Add A Class"}></SectionTitle>
            {/* <div className="flex-shrink-0 w-auto md:w-full"> */}
            <div className="p-2 ">
                <form onSubmit={handleSubmit(onSubmit)} className="m-0 w-full mx-auto">
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text font-semibold">Class Title*</span>
                        </label>
                        <input type="text" placeholder="Type here" {...register("title", { required: true })} className="input input-bordered w-10/12 md:w-full" />
                        {errors.title && <span className='text-red-600'>Class title  is required</span>}
                    </div>
                    {/* <div className='flex'> */}
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text font-semibold">Instructor name</span>
                        </label>
                        <input type="text" defaultValue={user && user.displayName} placeholder="Type here" className="input input-bordered w-10/12 md:w-full " disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text font-semibold">Instructor Email</span>
                        </label>
                        <input type="email" defaultValue={user && user.email} placeholder="Type here" className="input input-bordered w-10/12 md:w-full" disabled />
                    </div>
                    {/* </div> */}
                    {/* <div className='flex'> */}
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-10/12 md:w-full " />
                        {errors.price && <span className='text-red-600'>Price is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text font-semibold">Available Seat*</span>
                        </label>
                        <input type="number" {...register("seat", { required: true })} placeholder="Type here" className="input input-bordered w-10/12 md:w-full " />
                        {errors.seat && <span className='text-red-600'>Available seat is required</span>}
                    </div>
                    {/* </div> */}
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text font-semibold">What will students learn from this course? (Use commas(,) to separate them on new lines)</span>
                        </label>
                        <textarea {...register("classdes", { required: true })} className="textarea textarea-bordered h-24 w-10/12 md:w-full" placeholder="Class Details"></textarea>
                        {errors.classdes && <span className='text-red-600'>Class details is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text font-semibold">Class Image</span>
                        </label>
                        {/* <input  type="file" className=" w-10/12 md:w-full " /> */}
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-10/12 md:w-full max-w-xs" />
                        {errors.image && <span className='text-red-600'>Image is required</span>}
                    </div>
                    <input className='btn btn-sm mt-4 w-6/12 md:w-full' type="submit" value="Add Class" />
                </form>
            </div>
            {/* </div> */}
        </div>
    );
};

export default AddClass;