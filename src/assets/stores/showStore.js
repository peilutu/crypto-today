import Axios from "axios";
import { create } from "zustand";
import debounce from "../../helpers/debounce";

const showStore = create((set) => ({
  graphData: [],
  data: null,

  reset: () => {
    set({ graphData: [], data: null });
  },

  fetchData: async (id, days = 120) => {
    const [graphRes, dataRes] = await Promise.all([
      Axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      ),
      Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
    ]);
    // const res = await Axios.get(
    //   `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=120`
    // );

    const graphData = graphRes.data.prices.map((price) => {
      const [timespamp, p] = price;
      const date = new Date(timespamp).toLocaleDateString("en-us");

      return {
        Date: date,
        Price: p,
      };
    });
    set({ graphData });
    set({ data: dataRes.data });
    console.log(dataRes.data);
  },
}));

export default showStore;
