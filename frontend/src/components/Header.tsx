import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../header.css";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY || window.pageYOffset || 0;

    const onScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      const delta = currentY - lastY.current;

      // petit seuil pour ignorer micro-mouvements
      const THRESHOLD = 25;
      if (Math.abs(delta) < THRESHOLD) return;

      if (currentY > lastY.current) {
        // descente -> cacher
        setHidden(true);
      } else if (currentY < lastY.current) {
        // montée -> afficher
        setHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${hidden ? "site-header--hidden" : ""}`}>
      <div className="site-header-inner">
        <h1 className="brand">
          <NavLink to="/">Mon Portfolio</NavLink>
        </h1>

        <nav aria-label="Navigation principale">
          <ul className="nav-list">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Présentation</NavLink>
            </li>
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
