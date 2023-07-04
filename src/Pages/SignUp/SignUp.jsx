import { useForm } from 'react-hook-form';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const SignUp = () => {
    const navigate = useNavigate()

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
                        const saveUser = { name: data.name, email: (data.email.toLowerCase()), gender: data.gender, role: 'student' }

                        console.log(saveUser);

                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
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
            <div className="hero py-20">
                <div className="hero-content flex-col w-1/2">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold my-8">Register</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your Name" className="input input-bordered w-full"
                                        {...register("name", { required: true })} />
                                    {errors.name && <span className='text-red-600'>Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered w-full"
                                        {...register("email", { required: true })} />
                                    {errors.email && <span className='text-red-600'>Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Select Your Gender</span>
                                    </label>
                                    <select defaultValue={"Choose one"} {...register("gender", { required: true })} className="select select-bordered">
                                        <option disabled>Choose One</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                    {errors.email && <span className='text-red-600'>Gender is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered"
                                        {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/ })} />
                                    {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                                    {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 characters</span>}
                                    {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must be contain one uppercase, one lowercase, and one special characters</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered"
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
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="url" {...register("photoURL", { required: true })} name="photoURL" placeholder="Your photo URL" className="input input-bordered" />
                                    {errors.photoURL && <span className='text-red-600'>Photo is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    {/* <button className="btn btn-primary">Login</button> */}
                                    <input className="btn bg-[#EE5B54] hover:outline-[#EE5B54]" type="submit" value="Register" />
                                </div>
                            </form>
                            <SocialLogin></SocialLogin>
                            <p className="text-center"><small className="px-4">Already have an account?</small> <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;