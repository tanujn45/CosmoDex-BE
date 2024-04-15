import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const app: Express = express();
const PORT: number = 3001;
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/tokens", async (req: Request, res: Response) => {
  try {
    const response =
      await Moralis.EvmApi.marketData.getTopCryptoCurrenciesByTradingVolume();

    console.log(response);
    return res.status(200).json(response.raw);
  } catch (error) {
    console.error("Error on /tokenPrices", error);
    return res.status(500).json({ error: error });
  }
});

Moralis.start({ apiKey: process.env.MORALIS_KEY }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
