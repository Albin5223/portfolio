import { useEffect, useRef, useState } from "react";
import "../header.css";

const NAV_ITEMS = [
  { id: "home", label: "Presentation" },
  { id: "projects", label: "Projets" },
  { id: "experiences", label: "Experiences" },
  { id: "formation", label: "Formation" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY || window.pageYOffset || 0;

    const onScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      const delta = currentY - lastY.current;

      const THRESHOLD = 200;
      if (Math.abs(delta) < THRESHOLD) return;

      if (currentY > lastY.current) {
        setHidden(true);
      } else if (currentY < lastY.current) {
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
        <a className="brand" href="#home">
          <span className="brand-mark">PA</span>
          <span className="brand-text">
            <span className="brand-name">Paris Albin</span>
            <span className="brand-role">Chef de projet / Dev</span>
          </span>
        </a>

        <nav aria-label="Navigation principale">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="site-header-glow" aria-hidden="true" />
    </header>
  );
}
