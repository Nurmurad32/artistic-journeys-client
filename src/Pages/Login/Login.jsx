// import { useForm } from "react-hook-form";
// import "./Login.css"
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import SocialLogin from "../Shared/SocialLogin/SocialLogin";
// import { Helmet } from "react-helmet-async";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";
// import PageTitle from "../../Components/PageTitle/PageTitle";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useRef, useState } from 'react';
// import logo from "../../assets/logo.png";

// const Login = () => {
//     // const [disabled, setDisabled] = useState(true)
//     const { signIn, passwordReset } = useAuth()
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [showPass, setShowPass] = useState(false)
//     const emailRef = useRef();
//     const [emailError, setEmailError] = useState("")
//     const [eError, setEError] = useState(false)

//     const from = location.state?.from?.pathname || "/"

//     const {
//         register,
//         reset,
//         handleSubmit,
//         formState: { errors },
//     } = useForm()

//     const onSubmit = (data) => {
//         console.log(data)

//         signIn(data.email, data.password)
//             .then(result => {
//                 const user = result.user;
//                 console.log(user);
//                 Swal.fire({
//                     title: 'Logged in successfully',
//                     showClass: {
//                         popup: 'animate__animated animate__fadeInDown'
//                     },
//                     hideClass: {
//                         popup: 'animate__animated animate__fadeOutUp'
//                     }
//                 })
//                 navigate(from, { replace: true })
//                 reset()
//             })
//     }

//     const handleForgotPassword = () => {
//         console.log(emailRef.current);
//         const email = emailRef.current.value; // Use optional chaining to avoid errors if emailRef.current is null or undefined
//         if (!email) {
//             console.log("please provide an email", email);
//             setEmailError("please provide an email");
//             setEError(true);
//             return;
//         } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
//             setEError(false);
//             console.log("please provide a valid email", email);
//             setEmailError("please provide a valid email");
//             setEError(true);
//             return;
//         }
//         setEError(false);
//         passwordReset(email)
//             .then(() => {
//                 alert("Please Check your email");
//             })
//             .catch((error) => {
//                 console.log(error);
//                 // Handle error
//             });
//     };


//     return (
//         <div className="set-bg" >
//             <Helmet>
//                 <title>Artistic Journeys || Login</title>
//             </Helmet>
//             {/* <PageTitle heading={"Login"} subHeading={"Home > Login"}></PageTitle> */}
//             <div className="hero min-h-screen pb-8 ">
//                 <div className="hero-content flex-col w-1/2">
//                     <div>
//                         <Link to="/">
//                             <img src={logo} alt="" />
//                         </Link>
//                     </div>
//                     <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-auto md:w-full">
//                         <div className="text-center">
//                             <h1 className="text-2xl md:text-4xl font-bold mt-8 mb-4">LOGIN</h1>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={handleSubmit(onSubmit)} className="my-0 w-auto md:w-full">
//                                 <div className="form-control">
//                                     {/* <label className="label"> */}
//                                     <span className="label-text">Email</span>
//                                     {/* </label> */}
//                                     <input type="email" onChange={handleChange} ref={emailRef} placeholder="email" className="input input-bordered w-auto md:w-full"
//                                         {...register("email", { required: true })} />
//                                     {errors.email && <span className='text-red-600'>Email is required</span>}
//                                     {eError && <span className='text-red-600'>{emailError}</span>}
//                                 </div>
//                                 <div className="form-control">
//                                     {/* <label className="label"> */}
//                                     <span className="label-text">Password</span>
//                                     {/* </label> */}
//                                     <label className=' relative'>
//                                         <input type={`${showPass === true ? "password" : "text"}`} placeholder="password" className="input input-bordered w-auto md:w-full"
//                                             {...register("password", { required: true })} />
//                                         <p className='flex absolute right-0 bottom-8 z-10 pr-4'>{showPass === true ? <AiOutlineEyeInvisible onClick={() => setShowPass(!showPass)} /> : <AiOutlineEye onClick={() => setShowPass(!showPass)} />}</p>
//                                     </label>
//                                     {errors.password && <span className='text-red-600'>Password is required</span>}
//                                     {/* <label className="label"> */}
//                                     <p onClick={handleForgotPassword} className="cursor-pointer">Forgot password?</p>
//                                     {/* </label> */}
//                                 </div>
//                                 <div className="form-control mt-6">
//                                     <input className="btn hover:bg-[#3d98b5] bg-[#D05A32] text-white w-auto md:w-full" type="submit" value="Login" />
//                                 </div>
//                             </form>
//                             <p className='text-[#3d98b5] text-center mb-2'><small>New here? <Link to="/register" >Create a New Account</Link></small> </p>
//                             <div className="divider m-0"><small className="text-[#3d98b5]">Or</small></div>
//                             <p className='text-[#3d98b5] text-center'><small>Sign in with</small></p>
//                             <SocialLogin></SocialLogin>
//                             {/* <p className="text-center"><small className="px-4">Do not have an account?</small> <Link className="btn w-auto hover:bg-[#D05A32] bg-[#3d98b5] text-white" to="/register">Sign Up</Link></p> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
import { useForm } from "react-hook-form";
import "./Login.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from 'react'; // Remove useRef import
import logo from "../../assets/logo.png";

const Login = () => {
    const { signIn, passwordReset } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" }); // State to store form data
    const [emailError, setEmailError] = useState("");
    const [eError, setEError] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);

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
            })
    };

    const handleForgotPassword = () => {
        const email = formData.email;
        if (!email) {
            console.log("please provide an email", email);
            setEmailError("Please provide an email");
            setEError(true);
            return;
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setEError(false);
            console.log("please provide a valid email", email);
            setEmailError("Please provide a valid email");
            setEError(true);
            return;
        }
        setEError(false);
        passwordReset(email)
            .then(() => {
                // alert("Please Check your email");
                Swal.fire("Please Check your email");
            })
            .catch((error) => {
                setEError(true);
                setEmailError("User Not Found");
                console.log(error);
                // Handle error
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="set-bg" >
            <Helmet>
                <title>Artistic Journeys || Login</title>
            </Helmet>
            {/* <PageTitle heading={"Login"} subHeading={"Home > Login"}></PageTitle> */}
            <div className="hero min-h-screen pb-8 ">
                <div className="hero-content flex-col w-1/2">
                    <div>
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-auto md:w-full">
                        <div className="text-center">
                            <h1 className="text-2xl md:text-4xl font-bold mt-8 mb-4">LOGIN</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="my-0 w-auto md:w-full">
                                <div className="form-control">
                                    {/* <label className="label"> */}
                                    <span className="label-text">Email</span>
                                    {/* </label> */}
                                    <input type="email" name="email" placeholder="email" className="input input-bordered w-auto md:w-full"
                                        {...register("email", { required: true })} onChange={handleChange} value={formData.email} />
                                    {errors.email && <span className='text-red-600'>Email is required</span>}
                                    {eError && <span className='text-red-600 mb-3.5'>{emailError}</span>}
                                </div>
                                <div className="form-control">
                                    {/* <label className="label"> */}
                                    <span className="label-text">Password</span>
                                    {/* </label> */}
                                    <label className=' relative'>
                                        <input type={`${showPass === true ? "password" : "text"}`} name="password" placeholder="password" className="input input-bordered w-auto md:w-full"
                                            {...register("password", { required: true })} onChange={handleChange} value={formData.password} />
                                        <p className='flex absolute right-0 bottom-8 z-10 pr-4'>{showPass === true ? <AiOutlineEyeInvisible onClick={() => setShowPass(!showPass)} /> : <AiOutlineEye onClick={() => setShowPass(!showPass)} />}</p>
                                    </label>
                                    {errors.password && <span className='text-red-600'>Password is required</span>}
                                    {/* <label className="label"> */}
                                    <p onClick={handleForgotPassword} className="cursor-pointer">Forgot password?</p>
                                    {/* </label> */}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn hover:bg-[#3d98b5] bg-[#D05A32] text-white w-auto md:w-full" type="submit" value="Login" />
                                </div>
                            </form>
                            <p className='text-[#3d98b5] text-center mb-2'><small>New here? <Link to="/register" >Create a New Account</Link></small> </p>
                            <div className="divider m-0"><small className="text-[#3d98b5]">Or</small></div>
                            <p className='text-[#3d98b5] text-center'><small>Sign in with</small></p>
                            <SocialLogin></SocialLogin>
                            {/* <p className="text-center"><small className="px-4">Do not have an account?</small> <Link className="btn w-auto hover:bg-[#D05A32] bg-[#3d98b5] text-white" to="/register">Sign Up</Link></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
