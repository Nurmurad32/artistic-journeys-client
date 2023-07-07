import { useForm } from "react-hook-form";
import "./Login.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { AiOutlineEye , AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from 'react';

const Login = () => {
    // const [disabled, setDisabled] = useState(true)
    const { signIn } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const [showPass , setShowPass] = useState(false)

    const from = location.state?.from?.pathname || "/"

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Logged in successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(from, { replace: true })
                reset()
            })
    }


    return (
        <div className="set-bg" >
            <Helmet>
                <title>Artistic Journeys || Login</title>
            </Helmet>
            <PageTitle heading={"Login"} subHeading={"Home > Login"}></PageTitle>
            <div className="hero min-h-screen pb-8 ">
                <div className="hero-content flex-col w-1/2">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-8">LOGIN</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="my-0">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" className="input input-bordered w-full"
                                        {...register("email", { required: true })} />
                                    {errors.email && <span className='text-red-600'>Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <label className='flex self-center relative'>
                                    <input type={`${ showPass === true ? "password" : "text"}`} placeholder="password" className="input input-bordered"
                                        {...register("password", { required: true })} />
                                    <p className='flex absolute right-0 bottom-8 z-10 pr-4'>{showPass === true ? <AiOutlineEyeInvisible onClick={() => setShowPass(!showPass)} /> : <AiOutlineEye onClick={() => setShowPass(!showPass)} />}</p>
                                    </label>
                                    {errors.password && <span className='text-red-600'>Password is required</span>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn hover:bg-[#3d98b5] bg-[#D05A32] text-white" type="submit" value="Login" />
                                </div>
                            </form>
                            <SocialLogin></SocialLogin>
                            <p className="text-center"><small className="px-4">Do not have an account?</small> <Link className="btn hover:bg-[#D05A32] bg-[#3d98b5] text-white" to="/register">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;