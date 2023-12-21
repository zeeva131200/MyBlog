import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        <Link to ="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </nav>
    </header>
  );
}
