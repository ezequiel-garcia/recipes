import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/nav/MainNavigation';

const SecondayLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default SecondayLayout;
