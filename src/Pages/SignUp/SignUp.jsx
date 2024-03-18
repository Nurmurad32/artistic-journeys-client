import { useForm } from 'react-hook-form';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import PageTitle from '../../Components/PageTitle/PageTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from 'react';
import logo from "../../assets/logo.png";

const SignUp = () => {
    const navigate = useNavigate()
    const [axiosSecure] = useAxiosSecure()
    const [showPass, setShowPass] = useState(false)

    console.log('show pass', showPass)

    const { register, reset, watch, handleSubmit, formState: { errors }, } = useForm()
    const { createUser, updateUserProfile } = useAuth();

    const onSubmit = (data) => {
        console.log(data)
        // User Create to Firebase
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                // User Information Update to Firebase
                updateUserProfile(data.name, data.photoURL)
                    .then(result => {
                        // User Info send to MongoDB
                        const saveUser = { name: data.name, email: (data.email.toLowerCase()), gender: data.gender, role: 'student', image: data.photoURL }

                        console.log(saveUser);

                        // fetch('http://localhost:3000/users', {
                        //     method: 'POST',
                        //     headers: {
                        //         'content-type': 'application/json',
                        //     },
                        //     body: JSON.stringify(saveUser)
                        // })
                        //     .then(res => res.json())
                        axiosSecure.post('/users', saveUser)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset()
                                    Swal.fire({
                                        position: 'top-center',
                                        icon: 'success',
                                        title: 'User Created Successfully',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                    navigate('/')
                                }
                            })
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })

                reset();
            })
    }

    return (
        <div className="set-bg" >
            <Helmet>
                <title>Artistic Journeys || Sign Up</title>
            </Helmet>
            {/* <PageTitle heading={"Sign Up"} subHeading={"Home > Register"}></PageTitle> */}
            <div className="hero min-h-screen pb-8 ">
                <div className="hero-content flex-col w-1/2">
                    <div>
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-auto md:w-full">
                        <div className="text-center ">
                            <h1 className="text-2xl md:text-4xl font-bold mt-8 mb-4">Register</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className='my-1 w-auto md:w-full'>
                                <div className="form-control">
                                    {/* <label className="label"> */}
                                        <span className="label-text">Name</span>
                                    {/* </label> */}
                                    <input type="text" placeholder="Your Name" className="input input-bordered  w-auto md:w-full"
                                        {...register("name", { required: true })} />
                                    {errors.name && <span className='text-red-600'>Name is required</span>}
                                </div>
                                <div className="form-control">
                                    {/* <label className="label"> */}
                                        <span className="label-text">Email</span>
                                    {/* </label> */}
                                    <input type="email" placeholder="email" className="input input-bordered  w-auto md:w-full"
                                        {...register("email", { required: true })} />
                                    {errors.email && <span className='text-red-600'>Email is required</span>}
                                </div>
                                <div className="form-control">
                                    {/* <label className="label"> */}
                                        <span className="label-text">Select Your Gender</span>
                                    {/* </label> */}
                                    <select defaultValue={" "} {...register("gender", { required: true })} className="select select-bordered w-auto md:w-full">
                                        <option>Choose One</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                    {errors.email && <span className='text-red-600'>Gender is required</span>}
                                </div>
                                <div className="form-control">
                                    {/* <label className="label"> */}
                                        <span className="label-text">Password</span>
                                    {/* </label> */}
                                    <label className=' relative'>
                                        <input type={`${showPass === false ? "text" : "password"}`} placeholder="password" className="input input-bordered w-auto md:w-full"
                                            {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/ })} />
                                        <p className='flex absolute right-0 bottom-8 z-10 pr-4'>{showPass === true ? <AiOutlineEyeInvisible onClick={() => setShowPass(!showPass)} /> : <AiOutlineEye onClick={() => setShowPass(!showPass)} />}</p>
                                    </label>
                                    {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                                    {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 characters</span>}
                                    {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must be contain one uppercase, one lowercase, and one special characters</span>}

                                </div>
                                <div className="form-control">
                                    {/* <label className="label"> */}
                                        <span className="label-text">Confirm Password</span>
                                    {/* </label> */}
                                    <input type="password" placeholder="password" className="input input-bordered w-auto md:w-full"
                                        {...register("confirm_password", {
                                            required: true,
                                            validate: (val) => {
                                                if (watch('password') != val) {
                                                    return "Your passwords do no match";
                                                }
                                            },
                                        })} />
                                    {errors.confirm_password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                                    {errors.confirm_password?.type === 'validate' && <span className='text-red-600'>Your passwords do no match</span>}
                                </div>
                                <div className="form-control">
                                    {/* <label className="label"> */}
                                        <span className="label-text">Photo URL</span>
                                    {/* </label> */}
                                    <input type="url" {...register("photoURL", { required: true })} name="photoURL" placeholder="Your photo URL" className="input input-bordered  w-auto md:w-full" />
                                    {errors.photoURL && <span className='text-red-600'>Photo is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    {/* <button className="btn btn-primary">Login</button> */}
                                    <input className="btn  w-auto md:w-full hover:bg-[#3d98b5] bg-[#D05A32] text-white" type="submit" value="Register" />
                                </div>
                            </form>
                            {/* <SocialLogin></SocialLogin>
                            <p className="text-center"><small className="px-4">Already have an account?</small> <Link className="btn hover:bg-[#D05A32] bg-[#3d98b5] text-white" to="/login">Login</Link></p> */}
                        <p className='text-[#3d98b5] text-center mb-2'><small>Already have an account? <Link to="/login" >Log In</Link></small> </p>
                            <div className="divider m-0"><small className="text-[#3d98b5]">Or</small></div>
                    <p className='text-[#3d98b5] text-center'><small>Sign in with</small></p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;