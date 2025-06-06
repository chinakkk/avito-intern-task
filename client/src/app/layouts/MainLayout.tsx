import { Header } from 'src/widgets';
import { Outlet } from 'react-router-dom';
import { Container } from 'src/shared/ui';

export const MainLayout = () => (
  <div className={'h-screen flex flex-col'}>
    <Header />
    <main className="flex-1 overflow-y-auto pt-16">
      <Container>
        <Outlet />
      </Container>
    </main>
  </div>
);
