import { useEffect } from "react";
import homeStore from "../stores/homeStore";
import Header from "../components/Header";
import ListItems from "../components/ListItem";

const Home = () => {
  const store = homeStore();

  useEffect(() => {
    if (store.trending.length === 0) store.fetchCoins();
    // store.fetchCoins();
    // store.query = "";
  }, []);

  return (
    <div className="home-container relative width">
      <Header search />
      {/* <header className="header md:flex relative">
        <Link className="relative width" to={"/"}>
          <p className="logo">
            CRYPTO TO<span className="day">DAY</span>{" "}
            <span className="logo-round"></span>
          </p>
        </Link>

        <div className="home-search width relative">
          <input
            type="text"
            value={store.query}
            placeholder="search for a coin..."
            onChange={store.setQuery}
          />
        </div>
      </header> */}

      {/* <svg
        className="abusolute top='50%'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width={"30px"}
        height={"30px"}
      >
        <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
      </svg> */}

      <section className="">
        <h2 className="welcome text-end pe-10">
          {store.query.length > 2 ? store.query : `Popular`}
          <p className="text-[10px]">
            {store.query.length > 2
              ? `see my coin details`
              : `Trending Coins Today`}
          </p>
        </h2>

        <div className="lists-container">
          <h4 className="title flex">
            <span>name</span>
            <span>symbol</span>
            <span>market cap</span>
            {store.query.length > 2 ? <span></span> : <span>Prices</span>}
          </h4>

          {store.coins.map((coin) => {
            return <ListItems key={coin.id} coin={coin} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
