// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import useAuth from "./useAuth";


// const axiosSecure = axios.create({
//   // baseURL: 'https://artistic-journeys-server.vercel.app',
//   baseURL: 'http://localhost:3000',
// });

// const useAxiosSecure = () => {
//   const { logOut } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axiosSecure.interceptors.request.use(function (config) {
//       const token = localStorage.getItem('access-token');
//       console.log("Request Stopped by Interceptors", token)
//       if (token) {
//         config.headers.authorization = `Bearer ${token}`;
//       }
//       // console.log(config)
//       return config;
//     }, function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     });

//     axiosSecure.interceptors.response.use(function (response) {
//       return response;
//     }, async (error) => {
//       if (error.response.status === 401 || error.response.status === 403) {
//         await logOut();
//         navigate('/');
//       }
//       // }
//       return Promise.reject(error);
//     }
//     );
//   }, [logOut,navigate]);

//   return [axiosSecure];
// };

// export default useAxiosSecure;

// useAxiosSecure.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
  baseURL: 'https://artistic-journeys-server.vercel.app',
  // baseURL: 'http://localhost:3000',
});

axiosSecure.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access-token');
  console.log("Request Stopped by Interceptors", token)
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosSecure.interceptors.response.use(function (response) {
  return response;
}, async (error) => {
  const { logOut } = useAuth(); // Importing useAuth here
  const navigate = useNavigate(); // Importing useNavigate here
  if (error.response.status === 401 || error.response.status === 403) {
    await logOut();
    navigate('/login');
  }
  return Promise.reject(error);
});

const useAxiosSecure = () => {
  return [axiosSecure];
};

export default useAxiosSecure;
