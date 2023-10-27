import { useEffect, useState } from "react";
import showStore from "../stores/showStore";
import { Link, useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Header from "../components/Header";
import arrow from "../../assets/arrow.png";

const Show = () => {
  const store = showStore();
  const params = useParams();
  const [days, setDays] = useState(120);

  useEffect(() => {
    store.fetchData(params.id, days);
    // store.fetchData("bitcoin");
    console.log("params.id:", params.id);

    return () => {
      store.reset();
    };
  }, []);

  if (!store.data) return <></>;

  return (
    <div className="show">
      <Header />

      <div className="header">
        <Link className="relative width flex pt-20" to={"/"}>
          <img src={arrow} alt="" className="arrow pr-4 ms-8" />
          <p className="back-home relative">
            BACK
            <span className="logo-round small-round"></span>
          </p>
        </Link>
      </div>

      <section className="show-section">
        {/* <img src={store.data.image.large} width={"50px"} /> */}
        <div className="mb-20">
          <h2>{store.data.name}</h2>
          <p>{store.data.symbol}</p>
        </div>
        <div className="show-graph width">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={store.graphData}
              margin={{ top: 50, right: 30, left: 50, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ebe2d0" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#ebe2d0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="Date" />
              <YAxis />

              <CartesianGrid strokeDasharray="0 10" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Price"
                stroke="#ebe2d0"
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
          </ResponsiveContainer>
        </div>

        <div className="show-details">
          <div className="">
            <h4 className="market-cap">Market Cap Rank</h4>
            <p className={"text-[3rem]"}>{store.data.market_cap_rank}</p>
          </div>

          <div>
            <div className="show-details-row">
              <h4>Current Price </h4>
              <p>${store.data.market_data.current_price.usd}</p>
            </div>

            <div className="show-details-row">
              <h4>24h High</h4>
              <p>${store.data.market_data.high_24h.usd}</p>
            </div>

            <div className="show-details-row">
              <h4>24h Low</h4>
              <p>${store.data.market_data.low_24h.usd}</p>
            </div>

            <div className="show-details-row">
              <h4>Circulating Supply</h4>
              <p>${store.data.market_data.circulating_supply}</p>
            </div>

            <div className="show-details-row">
              <h4>1 Year Change</h4>
              <p>
                {store.data.market_data.price_change_percentage_1y.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Show;
