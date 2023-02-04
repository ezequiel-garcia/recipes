import { Outlet } from 'react-router-dom';
import Background from '../components/Background';
import MainNavigation from '../components/nav/MainNavigation';

const RootLayout = () => {
  return (
    <Background>
      <MainNavigation />
      <Outlet />
    </Background>
  );
};

export default RootLayout;
