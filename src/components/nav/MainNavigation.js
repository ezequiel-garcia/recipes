import { useContext } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import RecipesContext from '../store/recipes-context';
import classes from './MainNavigation.module.css';
// import { auth } from '../../firebase';
// import { signOut } from 'firebase/auth';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const recipesCtx = useContext(RecipesContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate('/');
    authCtx.logout();
    recipesCtx.setRecipes([]);
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <p className={classes.logo}>RECIPES</p>
          </li>
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
              <NavLink
                to="/authentication"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
