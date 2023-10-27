import { Button } from "bootstrap";
import { Link } from "react-router-dom";

const ListItem = ({ coin }) => {
  return (
    <div>
      <Link to={`/${coin.id}`}>
        <h4 className="home-crypto">
          <span>
            <img className="home-crypto-image" src={coin.image} alt="" />
          </span>

          <span className="home-crypto-name">{coin.name}</span>
          <span className="home-crypto-symbol">{coin.symbol}</span>
          <span className="home-crypto-symbol">{coin.marketCapPank}</span>

          {coin.priceBtc && coin.priceUsd ? (
            <span className="home-crypto-prices">
              <span className="crypto-btc">{coin.priceBtc} BTC</span>
              <span className="crypto-usd">${coin.priceUsd} USD</span>
            </span>
          ) : (
            <button>See Details</button>
          )}
        </h4>
      </Link>
    </div>
  );
};

export default ListItem;
