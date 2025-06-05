import { Header } from 'src/widgets';
import { Outlet } from 'react-router-dom';
import { Container } from 'src/shared/ui';

export const MainLayout = () => (
  <>
    <Header />
    <main>
      <Container>
        <Outlet />
      </Container>
    </main>
  </>
);
