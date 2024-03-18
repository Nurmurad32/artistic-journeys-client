import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        // enabled: user?.email && !loading,
        enabled: false,
        queryFn: async() => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            console.log('res from axios', res)
            
            return res.data;
        },
        
    })

    useEffect(() => {
        if (user?.email && !loading) {
          refetch(); // Trigger the query when user data is available
        }
      }, [user?.email, loading, refetch]);

    return [cart, refetch]
};

export default useCart;


