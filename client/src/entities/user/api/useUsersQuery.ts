import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from 'src/shared/api/axiosInstance';
import { UserType } from 'src/entities/user/model/types/userTypes';

export const useUsersQuery = () => {
  return useQuery<UserType[]>({
    queryKey: ['users'],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axiosInstance.get('/users');
      //Ошибка на беке, приходится дважды доставать data
      return data.data;
    },
  });
};
