import { useEffect } from "react";
import showStore from "../stores/showStore";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Show = () => {
  const store = showStore();
  const params = useParams();

  useEffect(() => {
    store.fetchData(params.id);
    // store.fetchData("bitcoin");
    console.log("params.id:", params.id);
  }, []);

  if (!store.data) return <></>;

  return (
    <div>
      <header>
        <img src={store.data.image.large} width={"50px"} />
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>

      <AreaChart
        width={730}
        height={250}
        data={store.graphData}
        margin={{ top: 50, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="Date" />
        <YAxis />

        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Price"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        {/* <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        /> */}
      </AreaChart>

      <div>
        <h4>
          Market Cap Rank:<span>{store.data.market_cap_rank}</span>
        </h4>
      </div>

      <div>
        <h4>
          24h High <span>${store.data.market_data.high_24h.usd}</span>
        </h4>
      </div>

      <div>
        <h4>
          24h Low <span>${store.data.market_data.low_24h.usd}</span>
        </h4>
      </div>

      <div>
        <h4>
          Circulating Supply
          <span>${store.data.market_data.circulating_supply}</span>
        </h4>
      </div>

      <div>
        <h4>
          Current Price <span>${store.data.market_data.current_price.usd}</span>
        </h4>
      </div>

      <div>
        <h4>
          1 Year Change
          <span>
            {store.data.market_data.price_change_percentage_1y.toFixed(2)}%
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Show;
