import { Link } from "react-router-dom";
import homeStore from "../stores/homeStore";
import arrow from "../../assets/arrow.png";
// const Header = ({ back }) => {
//   return (
//     <header className="header width">
//       {back && <Link to="/"></Link>}
//       <p className="logo">
//         <Link to="/">Today</Link>
//       </p>
//     </header>
//   );
// };

const Header = ({ search }) => {
  const store = homeStore();
  return (
    <header className="header md:flex relative">
      <Link className="relative width" to={"/"}>
        <p className="logo">
          CRYPTO TO<span className="day">DAY</span>
          <span className="logo-round"></span>
        </p>
      </Link>

      <div className="home-search width relative">
        {search ? (
          <input
            type="text"
            value={store.query}
            placeholder="search for a coin..."
            onChange={store.setQuery}
          />
        ) : (
          <div className="w-[35rem]"></div>
        )}
      </div>
    </header>
  );
};

export default Header;
