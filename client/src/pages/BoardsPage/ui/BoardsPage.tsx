import type { FC } from 'react';
import { BoardList } from 'src/widgets/BoardList/ui';
import { PageLayout } from 'src/shared/ui';
import { PageTitle } from 'src/shared/ui/compontents/PageTitle';

//Страница с таблицами

export const BoardsPage: FC = () => {
  return (
    <PageLayout>
      <PageTitle title={'Проекты'} />
      <BoardList />
    </PageLayout>
  );
};
