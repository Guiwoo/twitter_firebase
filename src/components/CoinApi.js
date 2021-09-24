import CoinGecko from "coingecko-api";

const CoinGeckoClient = new CoinGecko();

//3. Make calls
const getCoinData = async () => await CoinGeckoClient.coins.all();

export default getCoinData;
