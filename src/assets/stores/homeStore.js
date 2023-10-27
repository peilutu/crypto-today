import Axios from "axios";
import { create } from "zustand";
import debounce from "../../helpers/debounce";

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: "",

  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  //每次search coin得到的放入coins state中；
  searchCoins: debounce(async () => {
    const { query, trending } = homeStore.getState();

    //加上这个if else使得当search字母少于2个时，可以回退到trending list。
    if (query.length > 2) {
      const res = await Axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const coins = res.data.coins.map((coin) => {
        return {
          name: coin.name,
          id: coin.id,
          image: coin.large,
          symbol: coin.symbol,
          marketCapPank: coin.market_cap_rank,
        };
      });

      set({ coins });
      console.log(res.data);
    } else {
      set({ coins: trending });
    }
  }, 100),

  //   一开始显示排名trending前7的coins，使用trending API，放入coins中
  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      Axios.get(`https://api.coingecko.com/api/v3/search/trending`),
      Axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
      ),
    ]);

    const btcPrice = btcRes.data.bitcoin.usd;

    // const res = await Axios.get(
    //   `https://api.coingecko.com/api/v3/search/trending`
    // );

    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        symbol: coin.item.symbol,
        priceBtc: coin.item.price_btc.toFixed(12),
        priceUsd: (coin.item.price_btc * btcPrice).toFixed(12),
        marketCapPank: coin.item.market_cap_rank,
      };
    });

    console.log(coins);
    // console.log(res.data.coins);

    set({ coins, trending: coins });
    // console.log(coins);
  },
}));

export default homeStore;
