import { PrediqtGraph } from "../src";

const apiUrl = process.env.PREDIQT_API_URL as string;
const client = new PrediqtGraph(apiUrl);
jest.setTimeout(10000);

test("Prediqt.getMarkets", async () => {
    const response = await client.getMarkets(true, 0, 100, "", null);
    expect(!!response).toBeTruthy();
});

test("Prediqt.getMarket", async () => {
    const response = await client.getMarket(0);
    expect(!!response).toBeTruthy();
});

test("Prediqt.getMarketPage", async () => {
    const response = await client.getMarketPage(12, null);
    expect(!!response).toBeTruthy();
});

test("Prediqt.getChainInfo", async () => {
    const response = await client.getChainInfo();
    expect(!!response).toBeTruthy();
});
