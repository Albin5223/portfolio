import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <h1 className="brand">
          <NavLink to="/">Mon Portfolio</NavLink>
        </h1>

        <nav aria-label="Navigation principale">
          <ul className="nav-list">
            <li>
              <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>Projets</NavLink>
            </li>
            <li>
              <NavLink to="/experiences" className={({ isActive }) => (isActive ? "active" : "")}>Expériences</NavLink>
            </li>
            <li>
              <NavLink to="/formation" className={({ isActive }) => (isActive ? "active" : "")}>Formation</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
