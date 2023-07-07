import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
    const { googleSignIn } = useAuth()

    const navigate = useNavigate();
    const location = useLocation();
    const [axiosSecure] = useAxiosSecure();

    const from = location.state?.from?.pathname || "/"

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);


                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: "student", image: loggedInUser.photoURL }
                // fetch('http://localhost:3000/users', {
                //     method: 'POST',
                //     headers: {
                //         'content-type': 'application/json',
                //     },
                //     body: JSON.stringify(saveUser)
                // })
                //     .then(res => res.json())
                axiosSecure.post('/users',saveUser )
                    .then((res) => {
                        console.log(res.data)
                        navigate(from, { replace: true })

                    })
            })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <div className="w-full text-center my-4">
                <button onClick={handleGoogleSignIn} className="btn btn-circle ">
                    <FcGoogle></FcGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;