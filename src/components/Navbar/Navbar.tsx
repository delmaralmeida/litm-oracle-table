import { Link, NavLink } from "react-router-dom";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link ${isActive ? "active" : ""}`;

function Navbar() {
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

          <NavLink to="/library" className={getNavLinkClass}>
            Library
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
