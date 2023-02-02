import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
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
          {authCtx.isLoggedIn && (
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
          )}
        </ul>
      </nav>

      <nav>
        <ul className={classes.list}>
          {!authCtx.isLoggedIn ? (
            <li>
              <NavLink to="/authentication">Login</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
