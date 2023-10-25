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
        };
      });

      set({ coins });
    } else {
      set({ coins: trending });
    }
  }, 500),

  //   一开始显示排名trending前7的coins，使用trending API，放入coins中
  fetchCoins: async () => {
    const res = await Axios.get(
      `https://api.coingecko.com/api/v3/search/trending`
    );

    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc,
      };
    });

    set({ coins, trending: coins });
    // console.log(coins);
  },
}));

export default homeStore;
