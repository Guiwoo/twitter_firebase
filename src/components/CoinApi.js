import CoinGecko from "coingecko-api";

const CoinGeckoClient = new CoinGecko();

//3. Make calls
const getCoinData = async () => {
  const result = await CoinGeckoClient.coins.all();
  return result;
};

export default getCoinData;
