import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import { Link } from "react-router-dom"; // Import Link

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark border-bottom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center text-white" to="/">
          <img src="https://i.ibb.co/8Xr3FWY/logo.png" alt="icon" className="logo-image me-2" />
          DSA-Helper
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Code Solver</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/beautify-code">Code Formatter</Link> {/* Update the path */}
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/code-converter">Code Converter</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
