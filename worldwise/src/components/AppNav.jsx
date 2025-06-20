import { NavLink } from "react-router-dom";
import style from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          {/* to="cities" → Relative to the current route (/app), becomes /app/cities.
              to="/cities" → Absolute path, navigates directly to /cities.
              to="../cities" → Goes up one level in nested routes, then to cities, also navigates to /cities. */}
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
