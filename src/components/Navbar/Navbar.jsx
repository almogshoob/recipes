import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <h1>המתכונים של אלמוג</h1>
      </Link>
    </nav>
  );
};

export { Navbar };

