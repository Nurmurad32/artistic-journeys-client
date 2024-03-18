// import { useQuery } from '@tanstack/react-query'
// import useAuth from './useAuth'
// import useAxiosSecure from './useAxiosSecure';

// const useAdminOrInstructor = () => {
//   const { user, loading } = useAuth();
//   const [axiosSecure] = useAxiosSecure();

//   const { refetch, data: isAdminOrInstructor, isPending: isAdminOrInstructorLoading } = useQuery({
//     queryKey: [user?.email, 'isAdminOrInstructor'],
//     enabled: !loading,
//     queryFn: async () => {

//       console.log("Asking or checking is Admin");
//       const res = await axiosSecure.get(`/users/role/${user?.email}`);
//       console.log(res.data);
//       return res.data?.role;
//     }
//   });
//   return [isAdminOrInstructor, isAdminOrInstructorLoading, refetch];
// };

// export default useAdminOrInstructor;


// useAdminOrInstructor.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdminOrInstructor = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: isAdminOrInstructor, isPending: isAdminOrInstructorLoading } = useQuery({
    queryKey: [user?.email, 'isAdminOrInstructor'],
    enabled: !loading,
    queryFn: async () => {
      console.log("Asking or checking is Admin");
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      console.log(res.data);
      return res.data?.role;
    }
  });

  return [isAdminOrInstructor, isAdminOrInstructorLoading, refetch];
};

export default useAdminOrInstructor;
