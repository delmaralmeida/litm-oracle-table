import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link ${isActive ? "active" : ""}`;

export default function Navbar() {
  return (
    <nav id="navbar">
      <div className="container">
        <Link to="/" className="brand-name">
          Table Atlas
        </Link>

        <div className="navigation">
          <NavLink to="/" end className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/tables" className={getNavLinkClass}>
            Tables
          </NavLink>

          <NavLink to="/collections" className={getNavLinkClass}>
            Collections
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
