export type BoardType = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export type CreateBoardInput = {
  name: string;
  description?: string;
};

export type UpdateBoardInput = {
  id: number;
  name?: string;
  description?: string;
};
