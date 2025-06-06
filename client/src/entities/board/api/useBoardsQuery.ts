import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from 'src/shared/api/axiosInstance';
import { BoardType } from 'src/entities/board/model/types/boardTypes';

//получаем таблицы
export const useBoardsQuery = () => {
  return useQuery<BoardType[]>({
    queryKey: ['boards'],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axiosInstance.get('/boards');
      //Ошибка на беке, приходится дважды доставать data
      return data.data;
    },
  });
};
