import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from 'src/shared/api/axiosInstance';
import { BoardType } from 'src/entities/board/model/types/boardTypes';

export const useBoardByIdQuery = (id: number) => {
  return useQuery<BoardType>({
    queryKey: ['board', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/board/${id}`);
      return data.data; //Ошибка на беке, приходится дважды доставать data
    },
  });
};
