import {PrediqtGraph} from "../src";

const client = new PrediqtGraph("https://prediqt-api-mainnet.azurewebsites.net/graphql");
jest.setTimeout(10000);

test("Prediqt.getMarkets", async () => {
    const response = await client.getMarkets(
        true, 0, 100,
        "all", "", null);
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
