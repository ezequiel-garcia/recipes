import { NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Recipes
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink>Login / Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
