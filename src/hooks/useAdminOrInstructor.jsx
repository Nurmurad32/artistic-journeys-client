import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure';

const useAdminOrInstructor = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdminOrInstructor, isLoading: isAdminOrInstructorLoading } = useQuery({
    queryKey: ['isAdminOrInstructor', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      // console.log('isAdminOrInstructor response', res);
      // console.log('isAdminOrInstructor response data', res.data);
      return res.data.role;
    }
  });

  return [isAdminOrInstructor, isAdminOrInstructorLoading];
};

export default useAdminOrInstructor;