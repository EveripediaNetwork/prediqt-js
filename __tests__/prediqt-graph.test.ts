import {PrediqtGraph} from "../src/prediqt-graph";

const client = new PrediqtGraph("https://prediqt-api-mainnet.azurewebsites.net/graphql");
jest.setTimeout(10000);

test("Prediqt.getMarkets", async () => {
    const response = await client.getMarkets();
    expect(!!response).toBeTruthy();
});
