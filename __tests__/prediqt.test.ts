import dotenv from "dotenv";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

import { OrderTypes } from "../src/enums/prediqt";

import { Prediqt } from "../src";

const currentConfig = dotenv.config({ path: `${__dirname}/../.env.test` });

if (currentConfig.error) {
    throw currentConfig.error;
}

const nodeEndpoint = process.env.NODE_ENDPOINT as string;
const from = process.env.PREDIQT_FROM as string;
const keys = process.env.PREDIQT_KEY as string;
const username = process.env.PREDIQT_USERNAME as string;
const signatureProvider = new JsSignatureProvider([keys]);
const auth = [
    {
        actor: from,
        permission: "active"
    }
];
const client = new Prediqt(
    { createApi: { signatureProvider, nodeEndpoint } },
    auth
);
jest.setTimeout(10000);

test("Prediqt.getFees", async () => {
    const response = await client.getFees();
    expect(!!response).toBeTruthy();
});

test("Prediqt.getBalance", async () => {
    const response = await client.getBalance(username, "EOS");
    expect(!!response).toBeTruthy();
});

test("Prediqt.getMarkets", async () => {
    const response = await client.getMarkets();
    expect(!!response).toBeTruthy();
});

test("Prediqt.getMarket", async () => {
    const response = await client.getMarket(0);
    expect(!!response).toBeTruthy();
});

test("Prediqt.getUserResources", async () => {
    const response = await client.getUserResources(username);
    expect(!!response).toBeTruthy();
});

test("Prediqt.getAccount", async () => {
    const response = await client.getAccount(username);
    expect(!!response).toBeTruthy();
});

test("Prediqt.getIqBalance", async () => {
    const response = await client.getIqBalance(username);
    expect(!!response).toBeTruthy();
});

test("Prediqt.getOrders", async () => {
    const response = await client.getOrders({
        nameId: OrderTypes.Yes,
        marketId: 4,
        limit: 50
    });
    expect(!!response).toBeTruthy();
});
