import { Link } from "react-router-dom";

const Header = ({ back }) => {
  return (
    <header className="header width">
      {back && <Link to="/"></Link>}
      <p className="logo">
        <Link to="/">Today</Link>
      </p>
    </header>
  );
};

export default Header;
